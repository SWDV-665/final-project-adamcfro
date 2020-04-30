import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  title = "Recipe Gallery";
  recipeList = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  addRecipe() {
    if (this.recipeName.length > 0) {
      let task = this.recipeName;
      this.recipeList.push(task);
      this.recipeName = "";
    }
  }

  deleteRecipe(index) {
    this.recipeList.splice(index, 1);
  }

  updateRecipe(index) {
    let alert = this.alertCtrl.create({
      title: "Update Recipe?",
      message: "Type in your new recipe to update.",
      inputs: [{ name: "editRecipe", placeholder: "Recipe" }],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Update",
          handler: (data) => {
            this.recipeList[index] = data.editRecipe;
          },
        },
      ],
    });
    alert.present();
  }
}
