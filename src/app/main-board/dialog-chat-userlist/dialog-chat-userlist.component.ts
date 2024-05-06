import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { CommonModule } from '@angular/common';
import { ChannelService } from '../../../services/channel.service';
import { ChatService } from '../../../services/chat.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { DocumentData, getDoc, onSnapshot } from '@angular/fire/firestore';
import { AuthenticationService } from '../../../services/authentication.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { user } from '@angular/fire/auth';
@Component({
  selector: 'app-dialog-chat-userlist',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './dialog-chat-userlist.component.html',
  styleUrl: './dialog-chat-userlist.component.scss'
})
export class DialogChatUserlistComponent implements OnInit {
  currentChannel: any[] = []
  currentChannelNames: any[] = []

  isHovering: boolean = false;
  isHovering2: boolean = false;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogChatUserlistComponent>,
    public channelService: ChannelService,
    public chatService: ChatService,
    public authService: AuthenticationService,
    public fireService: FirestoreServiceService) { }

  async ngOnInit(): Promise<void> {
    await this.displayNames()
  }


  async displayNames() {
    onSnapshot(this.channelService.getChannelDoc(), (list) => {
      const data = list.data()
      this.currentChannelNames = []

      this.currentChannel.push(this.channelService.setChannelObject(data, list.id))

      this.currentChannel[0].users.forEach(async (user: string) => {
        let name = await this.getUserName(user)
        this.currentChannelNames.push(name)
      });
    })
  }

  async getUserDoc(email: string) {
    const id = this.authService.getUserId(email)
    const user = this.fireService.getUser(id)
    const userDoc = await getDoc(user)
    return userDoc
  }


  async getUserName(email: string) {
    const userDoc = await this.getUserDoc(email)
    if (userDoc.exists()) {
      return userDoc.data()['name']
    }
  }

  getEmail(i: number) {
    let email = this.currentChannel?.[0].users[i]
    return email
  }



  closeChatUserlist() {
    this.dialogRef.close();
  }

  openAddUserinTheUserlist() {
    this.closeChatUserlist();
    this.dialog.open(DialogAddUserToChannelComponent, {
      position: {
        top: '190px',
        right: '590px',
      },
      panelClass: ['custom-container', 'add-user-dialog-responsive'],
      backdropClass: 'backdrop-add-user-dialog'
    });
  }

  async openProfilView(email: any) {
    let userDoc = await this.getUserDoc(email)
    if (userDoc.exists()) {
      this.fireService.userID = userDoc.data()['docID']
      this.fireService.userMail = userDoc.data()['mail']
      this.fireService.loginName = userDoc.data()['name']
      this.fireService.userImage = userDoc.data()['profileImg']
      this.fireService.userOnlineStatus = userDoc.data()['online']
    }
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  changeSrcOnHover(hovering: boolean, num: number) {
    if (num === 1)
      this.isHovering = hovering;
    else
      this.isHovering2 = hovering;
  }
}
