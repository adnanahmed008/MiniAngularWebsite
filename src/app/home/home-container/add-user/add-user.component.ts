import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EResponseCode } from 'src/app/enums/eresponse-code';
import { ILookingOption } from 'src/app/Interfaces/ilooking-option';
import { User } from 'src/app/models/user';
import { UserStoreService } from 'src/app/services/user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder,
    private srvUser: UserStoreService,
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

    this.frmUser = this.createUserForm();
  }

  setDefaultUserInformation() {
    // I just hard coded to save some time.
    this.user.name = "Adnan Ahmed";
    this.user.username = "adnanahmed008";
    this.user.city = "Islamabad";
    this.user.state = "Federal";
    this.user.country = "Pakistan";
    this.user.profession = "Full Stack Developer";
  }

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

  get f(): { [key: string]: AbstractControl } {
    return this.frmUser.controls;
  }

  saveUser() {
    if (!this.frmUser.valid) {
      this.frmUser.markAllAsTouched();
      // console.log(this.f.name?.dirty, this.name?.touched, this.name?.errors);
      return;
    }

    this.populateUserValues();

    if (this.isEditMode)
      this.updateExistingUser();
    else
      this.saveNewUser();
  }

  updateExistingUser() {
    this.srvUser.update(this.user)
      .then(code => {
        this.router.navigate(['/users']);
      }).catch(code => {
        if (code == EResponseCode.NOT_FOUND) {
          Swal.fire({
            title: "Error",
            text: "This user doesn't exists"
          });
        }
      });
  }

  saveNewUser() {
    this.srvUser.save(this.user)
      .then(code => {
        this.router.navigate(['/users']);
      }).catch(code => {
        if (code == EResponseCode.ALREADY_EXISTS) {
          Swal.fire({
            title: "Error",
            text: "The username is already taken"
          });
        }
      });
  }

  populateUserValues() {
    this.user.name = this.f["name"].value;
    this.user.username = this.f["username"].value;
    this.user.city = this.f["city"].value;
    this.user.state = this.f["state"].value;
    this.user.country = this.f["country"].value;
    this.user.profession = this.f["profession"].value;
    this.user.bio = this.f["bio"].value;
    this.user.university = this.f["university"].value;
    this.user.lookingFor = this.lookingFor.filter(x => x.isChecked).map(x => x.label);
  }

  loadUserFromStore() {
    this.user = this.srvUser.getByUsername(this.userToEdit) as User;
    if (this.user.lookingFor.length)
      this.lookingFor.forEach(x => {
        if (this.user.lookingFor.findIndex(y => y == x.label) > -1)
          x.isChecked = true;
      });
  }

  convertToLookingOption(label: string) {
    return <ILookingOption>{ isChecked: false, label };
  }
}
