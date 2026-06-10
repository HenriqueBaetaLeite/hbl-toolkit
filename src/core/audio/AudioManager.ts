export class AudioManager {
  private countdown =
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/countdown.mp3')
      : null;

  private stepChange =
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/step-change.ogg')
      : null;

  private finish =
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/finish.ogg')
      : null;

  playCountdown() {
    if (!this.countdown) return;

    this.countdown.currentTime = 0;
    this.countdown.play()
  }

  playStepChange() {
    if (!this.stepChange) return;

    this.stepChange.currentTime = 0;
    this.stepChange.play();
  }

  playFinish() {
    if (!this.finish) return;

    this.finish.currentTime = 0;
    this.finish.play().catch(err => console.error(err));
  }
}