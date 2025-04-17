// Audio manager for the Lunar Lander game

// Sound effect types
export enum SoundEffect {
  THRUST = 'thrust',
  ROTATION = 'rotation',
  LANDING = 'landing',
  EXPLOSION = 'explosion',
  WARNING = 'warning',
  SUCCESS = 'success'
}

// Audio manager class
class AudioManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  // Initialize the audio manager
  public init(): void {
    if (this.isInitialized) return;

    // Create audio elements for sound effects
    this.createSound(SoundEffect.THRUST, '/assets/sounds/thrust.mp3', true);
    this.createSound(SoundEffect.ROTATION, '/assets/sounds/rotation.mp3');
    this.createSound(SoundEffect.LANDING, '/assets/sounds/landing.mp3');
    this.createSound(SoundEffect.EXPLOSION, '/assets/sounds/explosion.mp3');
    this.createSound(SoundEffect.WARNING, '/assets/sounds/warning.mp3');
    this.createSound(SoundEffect.SUCCESS, '/assets/sounds/success.mp3');

    // Create music element
    this.music = new Audio('/assets/sounds/music.mp3');
    this.music.loop = true;
    this.music.volume = 0.3;

    this.isInitialized = true;
  }

  // Create a sound effect
  private createSound(type: SoundEffect, src: string, loop: boolean = false): void {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = 0.5;
    this.sounds.set(type, audio);
  }

  // Play a sound effect
  public playSound(type: SoundEffect): void {
    if (this.isMuted || !this.isInitialized) return;

    const sound = this.sounds.get(type);
    if (sound) {
      // Reset the sound to the beginning if it's already playing
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error(`Error playing sound ${type}:`, error);
      });
    }
  }

  // Stop a sound effect
  public stopSound(type: SoundEffect): void {
    if (!this.isInitialized) return;

    const sound = this.sounds.get(type);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Start playing background music
  public playMusic(): void {
    if (this.isMuted || !this.isInitialized || !this.music) return;

    this.music.play().catch(error => {
      console.error('Error playing music:', error);
    });
  }

  // Stop background music
  public stopMusic(): void {
    if (!this.isInitialized || !this.music) return;

    this.music.pause();
    this.music.currentTime = 0;
  }

  // Toggle mute state
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    
    // Update volume for all sounds
    this.sounds.forEach(sound => {
      sound.muted = this.isMuted;
    });
    
    if (this.music) {
      this.music.muted = this.isMuted;
    }
    
    return this.isMuted;
  }

  // Get mute state
  public getMuteState(): boolean {
    return this.isMuted;
  }
}

// Create a singleton instance
const audioManager = new AudioManager();

// Export the singleton instance
export default audioManager; 