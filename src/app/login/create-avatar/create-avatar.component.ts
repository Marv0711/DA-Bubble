import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';
import { StorageService } from '../../../services/storage.service';
import { StorageReference, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { user } from '@angular/fire/auth';
import { UpdateUserService } from '../../../services/update-user.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
interface StoragePath {
  fullPath: string;
}
@Component({
  selector: 'app-create-avatar',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, MatCheckboxModule, HeaderComponent, CreateAccountComponent],
  templateUrl: './create-avatar.component.html',
  styleUrl: './create-avatar.component.scss',

})


export class CreateAvatarComponent implements OnInit {
  @ViewChild('profileImg') profileImg!: ElementRef;

  constructor(public updateUserService: UpdateUserService, public storageService: StorageService) {
  }


  public avatarImages = [
    '../../../assets/img/avatars/male1.png',
    '../../../assets/img/avatars/male2.png',
    '../../../assets/img/avatars/female1.png',
    '../../../assets/img/avatars/male3.png',
    '../../../assets/img/avatars/male4.png',
    '../../../assets/img/avatars/female2.png',
  ]


  imageUrl: string = ''; // Variable zum Speichern der URL des hochgeladenen Bildes
  defaultImageUrl: string = '../../../assets/img/avatars/profile-image.png'; // Pfad zum Standardbild
  isDisabled: boolean = false
  currentFile!: File //aktuell hochgeladenes Bild
  ngOnInit(): void {
    this.setUsername()
  }
  setUsername() {

    let username = document.getElementById('name');
    if (username) {
      username.innerHTML = this.updateUserService.username;
    }
  }

  selectFile(event: any) {
    const file: File = event.target.files[0]; // Die ausgewählte Datei
    this.currentFile = file
    console.log(this.currentFile)
    // Bild in Basis64-Kodierung konvertieren und in die URL einfügen
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async uploadFile(storageSaveLocation: string) {
    let file: File = this.currentFile
    let path = this.storageService.createFileDirection(storageSaveLocation + file.name)
    await this.uploadToStorage(path, file)
    console.info('File upload succes!')
  }

  async uploadToStorage(path: StorageReference, file: File) {
    await uploadBytes(path, file)
  }



  async getStorageUrl(path: StoragePath) {
    let storageUrl = await this.getUrl(path.fullPath)
    console.log('Storage Url:' + storageUrl)
    return storageUrl
  }

  async getUrl(path: string) {
    try {
      const url = await getDownloadURL(ref(this.storageService.storage, path));
      return url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  selectAvatar(url: string | null | Promise<string | null>) {
    let img = this.profileImg.nativeElement
    img.src = url
  }

  createAccount() {
    this.uploadFile('profileImages/')
  }

}





