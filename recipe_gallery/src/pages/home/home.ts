import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  // title of app
  title = "Recipe Gallery";
  // array that holds recipes
  recipeList = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  /**
   * method for creating and adding recipes
   */
  addRecipe() {
    // if length of input is at least 1
    if (this.recipeName.length > 0) {
      // create variable for new recipe
      let recipe = this.recipeName;
      // push recipe to array
      this.recipeList.push(recipe);
      // clear input
      this.recipeName = "";
    }
  }

  /**
   * method for deleting existing recipes
   * @param index provides index of recipe item
   */
  deleteRecipe(index) {
    // remove item from index
    this.recipeList.splice(index, 1);
  }

  /**
   * method for updating existing recipes
   * @param index provides index of recipe item
   */
  updateRecipe(index) {
    // create alert to update recipe
    let alert = this.alertCtrl.create({
      // title for alert
      title: "Update Recipe?",
      // message for alert
      message: "Type in your new recipe to update.",
      // inputs for alert
      inputs: [
        {
          name: "editRecipe",
          // placeholder for alert
          placeholder: "Recipe",
        },
      ],
      // buttons for alert
      buttons: [
        // cancel button
        { text: "Cancel", role: "cancel" },
        // update button
        {
          text: "Update",
          handler: (data) => {
            this.recipeList[index] = data.editRecipe;
          },
        },
      ],
    });
    // show alert
    alert.present();
  }
}
