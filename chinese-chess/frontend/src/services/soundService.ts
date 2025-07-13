/**
 * 音效服務 - 處理遊戲中的音效播放
 */
export class SoundService {
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private enabled: boolean = true

  constructor() {
    this.initAudioContext()
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  /**
   * 使用 Web Audio API 產生音效
   */
  private createSound(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext || !this.enabled) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = type

      // 設定音量包絡
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.warn('Error playing sound:', error)
    }
  }

  /**
   * 播放棋子移動音效
   */
  playMoveSound(): void {
    this.createSound(800, 0.1, 'square')
  }

  /**
   * 播放棋子吃子音效
   */
  playCaptureSound(): void {
    this.createSound(400, 0.2, 'triangle')
  }

  /**
   * 播放非法移動音效
   */
  playInvalidMoveSound(): void {
    this.createSound(200, 0.3, 'sawtooth')
  }

  /**
   * 播放遊戲勝利音效
   */
  playWinSound(): void {
    // 播放一串音符表示勝利
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    notes.forEach((frequency, index) => {
      setTimeout(() => {
        this.createSound(frequency, 0.4, 'sine')
      }, index * 150)
    })
  }

  /**
   * 播放棋子選中音效
   */
  playSelectSound(): void {
    this.createSound(1000, 0.05, 'sine')
  }

  /**
   * 啟用/禁用音效
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  /**
   * 檢查音效是否啟用
   */
  isEnabled(): boolean {
    return this.enabled
  }

  /**
   * 恢復音頻上下文（處理瀏覽器自動播放政策）
   */
  async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume()
      } catch (error) {
        console.warn('Failed to resume audio context:', error)
      }
    }
  }
}

// 創建全局音效服務實例
export const soundService = new SoundService()