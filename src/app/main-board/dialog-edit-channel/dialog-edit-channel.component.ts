import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss'
})
export class DialogEditChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>, 
    public chatService: FirestoreServiceService,
    public channelService: ChannelService) {}

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
  }

 /**
 * Transforms the description title and save button for animation.
 * This function adjusts their positions to create a visual effect.
 */
  transformDescriptionAndSave() {
    const descriptionTitle = document.getElementById('titleDecription');
    const descriptionSave = document.getElementById('saveDescription');
    if(descriptionTitle && descriptionSave) {
      descriptionTitle.style.transition = "transform 0.1s ease";
      descriptionTitle.style.transform = "translateY(-10px)";
      descriptionSave.style.transition = "transform 5.0s ease";
      descriptionSave.style.transform = "translateY(-10px)";
    }
  }
}
