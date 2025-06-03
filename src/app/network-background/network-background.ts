import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-network-background',
  standalone: false,
  templateUrl: './network-background.html',
  styleUrl: './network-background.scss'
})
export class NetworkBackground implements OnInit {

  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private points: Point[] = [];
  private width = 0;
  private height = 0;
  private readonly POINT_COUNT = 70;
  private readonly CONNECT_DIST = 120;

  ngOnInit(): void {
    this.resizeCanvas();
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.generatePoints();
    this.animate();
  }

  @HostListener('window:resize')
  resizeCanvas(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private generatePoints(): void {
    this.points = Array.from({ length: this.POINT_COUNT }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updatePoints();
    this.drawConnections();
    requestAnimationFrame(this.animate);
  };

  private updatePoints(): void {
    for (const p of this.points) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= this.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= this.height) p.vy *= -1;
    }
  }

  private drawConnections(): void {
    this.ctx.fillStyle = '#f0f0f0';
    this.ctx.strokeStyle = 'rgba(240, 240, 240, 0.1)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
      this.ctx.fill();

      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.CONNECT_DIST) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

}
