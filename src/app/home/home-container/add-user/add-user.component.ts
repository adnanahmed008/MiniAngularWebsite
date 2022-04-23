import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EResponseCode } from 'src/app/enums/eresponse-code';
import { ICountry } from 'src/app/Interfaces/icountry';
import { ILookingOption } from 'src/app/Interfaces/ilooking-option';
import { User } from 'src/app/models/user';
import { CountryService } from 'src/app/services/country.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild("fileCoverImage") fileCoverImage?: ElementRef<HTMLInputElement>;
  @ViewChild("fileProfilePicture") fileProfilePicture?: ElementRef<HTMLInputElement>;

  // Using the same component for Create & Update operation
  public isEditMode: boolean = false;

  // This property will be helpful in case of edit/update mode to fetch information from user store
  private userToEdit: string = "";

  public user: User = new User();
  public frmUser: FormGroup = new FormGroup({});
  public lookingFor: ILookingOption[] = [
    { label: "Admission", isChecked: false },
    { label: "Job", isChecked: false },
    { label: "Scholarships", isChecked: false }
  ];

  public lstCountries: ICountry[] = [];

  public profilePictureAspectRatioError: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private srvUser: UserStoreService,
    private srvCountry: CountryService,
    private router: Router,
    private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.userToEdit = routeParams.get('username') || "";

    if (this.userToEdit.trim().length)
      this.isEditMode = true;
  }

  ngOnInit(): void {
    if (this.isEditMode)
      this.loadUserFromStore();
    else {
      // Comment the line below to prevent auto filling of information
      // this.setDefaultUserInformation();
    }

    // Create user form validations
    this.frmUser = this.createUserForm();

    // Load countries
    this.lstCountries = this.srvCountry.get();
  }

  // #region | Preparation |
  setDefaultUserInformation() {
    // I just hard coded to save some time.
    this.user.name = "Adnan Ahmed";
    this.user.username = "adnanahmed008";
    this.user.city = "Islamabad";
    this.user.state = "Federal";
    this.user.country = "Pakistan";
    this.user.profession = "Full Stack Developer";
  }

  loadUserFromStore() {
    this.user = this.srvUser.getByUsername(this.userToEdit) as User;
    if (this.user.lookingFor.length)
      this.lookingFor.forEach(x => {
        if (this.user.lookingFor.findIndex(y => y == x.label) > -1)
          x.isChecked = true;
      });
  }
  // #endregion

  // #region | Form |
  createUserForm() {
    return this.formBuilder.group({
      name: new FormControl(this.user.name, [Validators.required]),
      username: new FormControl({ value: this.user.username, disabled: this.isEditMode }, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      state: new FormControl(this.user.state, [Validators.required]),
      country: new FormControl(this.user.country, [Validators.required]),
      profession: new FormControl(this.user.profession, [Validators.required]),
      bio: new FormControl(this.user.bio),
      university: new FormControl(this.user.university),
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.frmUser.controls;
  }

  onSubmit() {
    if (this.user.base64ProfilePicture.length && this.profilePictureAspectRatioError) return;
    if (!this.frmUser.valid) {
      this.frmUser.markAllAsTouched();
      // console.log(this.f.name?.dirty, this.name?.touched, this.name?.errors);
      return;
    }

    this.populateUserValues();

    if (this.isEditMode)
      this.updateUser();
    else
      this.saveUser();
  }

  updateUser() {
    this.srvUser.update(this.user)
      .then(code => {
        this.router.navigate(['/home']);
      }).catch(code => {
        if (code == EResponseCode.NOT_FOUND) {
          Swal.fire({
            title: "Error",
            text: "This user doesn't exists"
          });
        }
      });
  }

  saveUser() {
    this.srvUser.save(this.user)
      .then(code => {
        this.router.navigate(['/home']);
      }).catch(code => {
        if (code == EResponseCode.ALREADY_EXISTS) {
          Swal.fire({
            title: "Error",
            text: "The username is already taken"
          });
        }
      });
  }

  cancel() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true
    }).then((resp) => {
      if (!resp.isConfirmed) return;

      this.router.navigate(['/home']);
    })
      .catch(() => { });
  }
  // #endregion

  // #region | Cover Image |
  onAddCoverImage() {
    this.fileCoverImage?.nativeElement.click();
  }

  onCoverSelection(e: Event) {
    let file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.base64CoverImage = reader.result as string;
    };
  }
  // #endregion


  // #region | Profile Picture |
  onAddProfilePicture() {
    this.fileProfilePicture?.nativeElement.click();
  }

  onProfilePictureLoad(e: Event) {
    let img = e.target as HTMLImageElement;
    let tempImg = new Image();
    tempImg.onload = (e) => {
      console.log(tempImg.width, tempImg.height, tempImg.width == tempImg.height);
      this.profilePictureAspectRatioError = !(tempImg.width == tempImg.height);
    };

    tempImg.src = img.src;
  }

  onProfilePictureSelection(e: Event) {
    let file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.base64ProfilePicture = reader.result as string;
    };
  }
  // #endregion

  // #region | Helpers |
  populateUserValues() {
    this.user.name = this.formControls["name"].value;
    this.user.username = this.formControls["username"].value;
    this.user.city = this.formControls["city"].value;
    this.user.state = this.formControls["state"].value;
    this.user.country = this.formControls["country"].value;
    this.user.profession = this.formControls["profession"].value;
    this.user.bio = this.formControls["bio"].value;
    this.user.university = this.formControls["university"].value;
    this.user.lookingFor = this.lookingFor.filter(x => x.isChecked).map(x => x.label);
  }

  convertToLookingOption(label: string) {
    return <ILookingOption>{ isChecked: false, label };
  }
  // #endregion
}
