import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ChannelService } from '../../../services/channel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { BoardHeaderComponent } from '../board-header/board-header.component';
@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss',
  providers: [DialogChatUserlistComponent,BoardHeaderComponent],
  imports: [MatIconModule, CommonModule, FormsModule, DialogChatUserlistComponent, BoardHeaderComponent]
})
export class DialogEditChannelComponent implements OnInit {

  channelName!: string
  description!: string
  username!: string
  isHovering: boolean
  isHovering2: boolean

  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>,
    public chatService: FirestoreServiceService,
    public channelService: ChannelService,
    public dialogUserlist: DialogChatUserlistComponent,
    private boardHeader: BoardHeaderComponent

  ) {
    this.isHovering = false
    this.isHovering2 = false


  }


  async ngOnInit(): Promise<void> {
    await this.dialogUserlist.displayNames()
  }


  async updateName() {
    await this.updateChannel('name', this.channelName);
    this.channelService.channelName = this.channelName
  }


  async updateDescription() {
    await this.updateChannel('description', this.description);
    this.channelService.channelDescription = this.description
  }


  async updateChannel(field: string, value: string) {
    if (!value) {
      this.showError()
      return;
    }
    this.updateChannelData(field, value)
  }


  showError() {
    alert('Es ist ein Fehler unterlaufen, Channel konnte nicht bearbeitet werden')
    this.closeEditWindowChannel();
  }


  async updateChannelData(field: string, value: string) {
    const id = this.channelService.getChannelDoc();
    await this.channelService.updateChannel(id, { [field]: value });
    this.closeEditWindowChannel();
  }





  /**
 * Closes the edit window for a channel.
 */
  closeEditWindowChannel() {
    this.dialogRef.close();
  }

  /**
  * Handles the action of leaving the edit window for a channel.
  * It simply calls the closeEditWindowChannel method to close the window.
  */
  leftEditWindowChannel() {
    this.closeEditWindowChannel();
  }

  /**
  * Initiates the process of editing the channel name.
  * It transforms the channel name and prepares the UI for editing.
  */
  editChannelName() {
    this.transformChannelNameAndSave();
    document.getElementById('edit')?.classList.add('d-none');
    document.getElementById('save')?.classList.remove('d-none');
    document.getElementById('nameOfChannel')?.classList.add('d-none');
    document.getElementById('inputChannelName')?.classList.remove('d-none');
    document.getElementById('channelBorder')?.classList.remove('border');
    document.getElementsByClassName('edit-mat-icon')[0]?.classList.add('d-none');
    document.getElementsByClassName('edit-mat-icon')[1]?.classList.add('d-none');
  }

  /**
  * Transforms the channel name and save button for animation.
  * This function adjusts their positions to create a visual effect.
  */
  transformChannelNameAndSave() {
    const channelAndSave = document.getElementById('save');
    const channelName = document.getElementById('channelName');
    if (channelAndSave && channelName) {
      channelName.style.transition = "transform 0.1s ease";
      channelName.style.transform = "translateY(-10px)";
      channelAndSave.style.transition = "transform 5.0s ease";
      channelAndSave.style.transform = "translateY(-10px)";
    }
  }

  /**
  * Initiates the process of editing the channel description.
  * It transforms the description area and prepares the UI for editing.
  */
  editDescription() {
    this.transformDescriptionAndSave();
    document.getElementById('editDescription')?.classList.add('d-none');
    document.getElementById('saveDescription')?.classList.remove('d-none');
    document.getElementById('text')?.classList.add('d-none');
    document.getElementById('descriptionChannel')?.classList.remove('border-description');
    document.getElementById('inputDescription')?.classList.remove('d-none');
    document.getElementsByClassName('edit-mat-icon')[0]?.classList.add('d-none');
    document.getElementsByClassName('edit-mat-icon')[1]?.classList.add('d-none');
  }

  /**
  * Transforms the description title and save button for animation.
  * This function adjusts their positions to create a visual effect.
  */
  transformDescriptionAndSave() {
    const descriptionTitle = document.getElementById('titleDecription');
    const descriptionSave = document.getElementById('saveDescription');
    if (descriptionTitle && descriptionSave) {
      descriptionTitle.style.transition = "transform 0.1s ease";
      descriptionTitle.style.transform = "translateY(-10px)";
      descriptionSave.style.transition = "transform 5.0s ease";
      descriptionSave.style.transform = "translateY(-10px)";
    }
  }

  async leaveChannel() {
    await this.channelService.removeUserFormChannel();
    this.closeEditWindowChannel();
    this.boardHeader.closeChannel();
    let chatWindow: any = document.getElementById('app-channel-chat-window')
    if(window.innerWidth > 1300){
      this.channelService.channelName = '';
      chatWindow.style.display = 'flex'
    }
  }
}
