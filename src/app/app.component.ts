import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  link: string = '';
  isModalVisible: boolean = false;
  modalContent: string = '';
  modalEmoji: string = '';
  modalGifSrc: string = '';



  searchCO2() {
    const trimmedLink = this.link.trim();

    // Simple regex for basic URL validation
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;

    if (trimmedLink === "") {
      this.showModal("Please paste a valid link! 😕", "", "");
      return;
    }

    if (!urlPattern.test(trimmedLink)) {
      this.showModal("This doesn't look like a valid URL. Please try again. 🤔", "", "");
      return;
    }

    // If the URL passes the regex check, continue with your logic
    const mockCO2Level = Math.floor(Math.random() * 600);  // Random CO₂ level between 0-600 ppm
    const maxCO2Level = 600;
    const percentageCO2 = (mockCO2Level / maxCO2Level) * 100;

    let message = `Mock data: CO₂ level in the area is approximately ${mockCO2Level} ppm (${percentageCO2.toFixed(2)}%).`;
    let emoji = "🌍";
    let gifSrc = "";

    if (percentageCO2 > 80) {
      message += " Oh no! The CO₂ level is dangerously high! 😱";
      emoji = "🔥";
      gifSrc = "img/bad.gif";
    } else if (percentageCO2 > 50) {
      message += " The CO₂ level is quite high! 🌱 Time to plant some trees!";
      emoji = "🌿";
      gifSrc = "img/mid.gif";
    } else {
      message += " The CO₂ level is acceptable for now. 😊";
      emoji = "💚";
      gifSrc = "img/good.gif";
    }

    this.showModal(message, emoji, gifSrc);
  }

  showModal(content: string, emoji: string, gifSrc: string) {
    this.modalContent = content;
    this.modalEmoji = emoji;
    this.modalGifSrc = gifSrc;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
