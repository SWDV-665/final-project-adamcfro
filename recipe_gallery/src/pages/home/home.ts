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
  recipeName;
  myphoto: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private camera: Camera
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
