import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeal , removeMeal } from '../action-creaters/actionCreaters';
import { capitalize } from '../utils/helpers';
import Modal from 'react-modal';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import Loading from 'react-loading';
import { fetchRecipes } from '../utils/api';
import Meals from './Meals';
import IngredientsList from './IngredientsList';

class App extends Component {
  state = {
    foodModalOpen : false ,
    day : null ,
    meal : null ,
    food : null ,
    loadingFood : false ,
    ingredientsModalOpen : false ,
  }
  openFoodModal = ({ meal , day })=>{
    this.setState ({
      foodModalOpen : true ,
      meal ,
      day ,
    });
  }
  closeFoodModal = () => {
    this.setState({
      foodModalOpen : false ,
      day : null ,
      meal : null ,
      food : null ,
    });
  }
  searchFood =(e) => {
    if(!this.input.value){
      return
    }
    e.preventDefault();

    this.setState(()=>({ loadingFood: true }));

    fetchRecipes(this.input.value)
      .then((food) => this.setState(()=>({
        food,
        loadingFood : false,
      })) )
  }
  openIngredientsModal = () => {
    this.setState(()=>({
    ingredientsModalOpen : true
    }));
  }
  closeIngredientsModal=()=> {
    this.setState(()=> ({
      ingredientsModalOpen : false ,
    }));
  }
  generateIngredientsList=()=>{
    return this.props.calendar.reduce((result , { meals }) => {
      const { breakfast , lunch , dinner } = meals;

      breakfast && result.push(breakfast);
      lunch && result.push(lunch);
      dinner && result.push(dinner) ;

      return result
    },[])
    .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines),[]) ;
  }
  render() {
    const { foodModalOpen , loadingFood , food , ingredientsModalOpen } = this.state ;
    const { calendar , remove , selectRecipe } = this.props ;
    const mealOrder = [ 'breakfast' , 'lunch' , 'dinner' ] ;
    return (
      <div className= 'container'>
       <div className = 'nav' >
         <h1 className = 'header'>Meal Planner</h1>
         <button
           className = 'shopping-list'
           onClick={this.openIngredientsModal}
           >
           Ingredients List
         </button>
       </div>
    <div className="card">
        <ul className= 'meal-types'>
          { mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button className = "icon-btn" onClick={() => remove({meal, day})}><FaTrashAlt size ={20}/></button>
                        </div>
                      : <button onClick={()=> this.openFoodModal ({ meal , day })} className='icon-btn'>
                          <FaPlusCircle size={25}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        </div>

        <Modal
         className='modal'
         overlayClassName='overlay'
         isOpen={foodModalOpen}
         onRequestClose={this.closeFoodModal}
         contentLabel='Modal'
         ariaHideApp={false}
       >
         <div>
           {loadingFood === true
             ? <Loading delay={200} type='spin' color='#222' className='loading' />
             : <div className='search-container'>
                 <h3 className='subheader'>
                   Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                 </h3>
                 <div className='search'>
                   <input
                     className='food-input'
                     type='text'
                     placeholder='Search Foods'
                     ref={(input) => this.input = input}
                   />
                   <button
                     className='icon-btn'
                     onClick={this.searchFood}>
                       <FaArrowAltCircleRight size={30}/>
                   </button>
                 </div>
                 {food !== null && (
                   <Meals
                     meal={food}
                     onSelect={(recipe) => {
                       selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                       this.closeFoodModal()
                     }}
                   />)}
               </div>}
         </div>
       </Modal>
       <Modal
         className= 'modal'
         overlayClassName = 'overlay'
         isOpen={ingredientsModalOpen}
         onRequestClose = {this.closeIngredientsModal}
         contentLabel = 'Modal'
         ariaHideApp={false}
         >
           {ingredientsModalOpen && <IngredientsList list = {this.generateIngredientsList()}/>}
         </Modal>
      </div>
    );
  }
}

function mapStateToProps({ calendar , food}){
const dayOrder = [ 'sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday' ];
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals,meal) => {
        meals[meal] = calendar[day][meal] ? food[calendar[day][meal]] : null ;
        return meals ;
      },{})
    }))
  }
}
function mapDispatchToProps (dispatch){
  return{
    selectRecipe : (data) => dispatch(addMeal(data)),
    remove : (data) => dispatch(removeMeal(data))
  }
}
export default connect (mapStateToProps , mapDispatchToProps)(App);