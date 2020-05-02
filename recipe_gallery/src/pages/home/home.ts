import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  // title of app
  title = "Recipe Gallery";
  // array that holds recipes
  recipeList = [];
  myphoto: any;
  recipe: any = {};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private camera: Camera
  ) {}

  /**
   * method for creating and adding recipes
   */
  addRecipe() {
    // create variable and string for new recipe
    let newRecipe = `Recipe Name: ${this.recipe.name} -- Ingredients: ${this.recipe.ingredients} -- Directions: ${this.recipe.directions}`;
    // push recipe to array
    this.recipeList.push(newRecipe);
    // clear inputs
    this.recipe.name = "";
    this.recipe.ingredients = "";
    this.recipe.directions = "";
  }

  /**
   * method for deleting existing recipes
   * @param index provides index of recipe item
   */
  deleteRecipe(index) {
    // remove item at index n
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
      // inputs for updating recipe
      inputs: [
        {
          name: "editRecipe",
          placeholder: "Recipe",
        },
        {
          name: "editIngredients",
          placeholder: "Ingredients",
        },
        {
          name: "editDirections",
          placeholder: "Directions",
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
            this.recipeList[
              index
            ] = `Recipe Name: ${data.editRecipe} -- Ingredients: ${data.editIngredients} -- Directions: ${data.editDirections}`;
          },
        },
      ],
    });
    // show alert
    alert.present();
  }
  /**
   * method for taking photo using Ionic Cordova Native Plugin
   */
  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.myphoto = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }
}
