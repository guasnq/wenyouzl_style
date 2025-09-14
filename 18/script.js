// 复古掌上游戏机交互脚本
// 处理弹窗显示/隐藏和键盘事件

// 简化的DOM选择器
const $ = (s) => document.querySelector(s);

// 获取页面元素
const btnEvents = $('#btn-events');
const btnStatus = $('#btn-status');
const ovEvents = $('#overlay-events');
const ovStatus = $('#overlay-status');
const closeEvents = $('#close-events');
const closeStatus = $('#close-status');

/**
 * 切换覆盖层显示状态
 * @param {Element} el - 要切换的元素
 */
function toggle(el) {
    if (!el) return;

    el.classList.toggle('show');
    el.setAttribute('aria-hidden', el.classList.contains('show') ? 'false' : 'true');
}

// 绑定按钮点击事件
btnEvents && btnEvents.addEventListener('click', () => toggle(ovEvents));
btnStatus && btnStatus.addEventListener('click', () => toggle(ovStatus));
closeEvents && closeEvents.addEventListener('click', () => toggle(ovEvents));
closeStatus && closeStatus.addEventListener('click', () => toggle(ovStatus));

// 绑定背景点击关闭事件
ovEvents && ovEvents.addEventListener('click', (e) => {
    if (e.target.classList.contains('backdrop')) {
        toggle(ovEvents);
    }
});

ovStatus && ovStatus.addEventListener('click', (e) => {
    if (e.target.classList.contains('backdrop')) {
        toggle(ovStatus);
    }
});

// 绑定键盘ESC键关闭事件
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (ovEvents?.classList.contains('show')) {
            toggle(ovEvents);
        }
        if (ovStatus?.classList.contains('show')) {
            toggle(ovStatus);
        }
        // 也关闭设置面板
        const ovSettings = $('#overlay-settings');
        if (ovSettings?.classList.contains('show')) {
            ovSettings.classList.remove('show');
            ovSettings.setAttribute('aria-hidden', 'true');
        }
    }
});

// ================== 泡泡效果系统 ==================
let bubbleSystem;

function initializeBubbleSystem() {
    console.log('Initializing enhanced bubble system...');

    try {
        // 创建完整的泡泡系统
        bubbleSystem = {
            canvas: $('#bubbleCanvas'),
            ctx: null,
            DPR: Math.min(2, window.devicePixelRatio || 1),
            bubbles: [],
            shards: [],
            W: 0,
            H: 0,
            isActive: true,

            // 设置参数（参考原始页面）
            settings: {
                density: 40,    // 密度
                size: 26,       // 大小
                lift: 120,      // 上升速度
                hueBase: 200    // 蓝色基调（参考页面的颜色）
            },

            init() {
                if (!this.canvas) return false;

                this.ctx = this.canvas.getContext('2d', { alpha: true });
                this.resize();
                this.bindEvents();
                this.startAnimation();
                console.log('Enhanced BubbleSystem initialized');
                return true;
            },

            resize() {
                const rect = this.canvas.getBoundingClientRect();
                this.W = Math.floor(rect.width);
                this.H = Math.floor(rect.height);
                this.canvas.width = Math.floor(this.W * this.DPR);
                this.canvas.height = Math.floor(this.H * this.DPR);
                this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
            },

            bindEvents() {
                this.canvas.addEventListener('click', (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    const mx = e.clientX - rect.left;
                    const my = e.clientY - rect.top;

                    let pick = null;
                    let best = 1e9;

                    for (const b of this.bubbles) {
                        const dx = b.x - mx;
                        const dy = b.y - my;
                        const d = dx * dx + dy * dy;
                        if (d < best && Math.sqrt(d) <= b.r * 1.1) {
                            best = d;
                            pick = b;
                        }
                    }

                    if (pick) {
                        pick.triggerPop();
                    }
                });
            },

            spawnBubbles(count) {
                count = count || Math.floor(this.settings.density / 3);
                console.log('Spawning', count, 'bubbles with settings');

                const baseR = this.settings.size * 0.8;
                const lift = this.settings.lift;

                for (let i = 0; i < count; i++) {
                    const r = baseR * (0.6 + Math.random() * 0.7);
                    const spd = lift * (0.7 + Math.random() * 0.7);
                    const x = this.W * 0.2 + Math.random() * this.W * 0.6;
                    const y = this.H - 20;
                    const vx = (Math.random() - 0.5) * 30;
                    const vy = -spd;

                    // 使用参考页面的颜色方案：蓝色基调 + 随机变化
                    const hue = (this.settings.hueBase + Math.random() * 70) % 360;

                    this.bubbles.push(this.createBubble(x, y, r, vx, vy, hue));
                }
            },

            createBubble(x, y, r, vx, vy, hue) {
                return {
                    x, y, r, vx, vy, hue,
                    alpha: 0.08 + Math.random() * 0.25, // 参考页面的透明度
                    twist: Math.random() * Math.PI * 2,
                    twistSpeed: 0.6 + Math.random() * 1.5,
                    oscAmp: 10 + Math.random() * 22,
                    life: 0,
                    maxLife: 5 + Math.random() * 6,
                    pop: false,
                    popProg: 0,
                    dead: false,

                    update(dt, W, H) {
                        this.life += dt;
                        this.twist += this.twistSpeed * dt;
                        this.x += this.vx * dt + Math.sin(this.twist) * 0.3;
                        this.y += this.vy * dt - Math.cos(this.twist) * (this.oscAmp * 0.04) * dt;

                        // 边界碰撞
                        if (this.x < this.r) { this.x = this.r; this.vx *= -0.6; }
                        if (this.x > W - this.r) { this.x = W - this.r; this.vx *= -0.6; }

                        // 生命周期结束或超出边界
                        if (this.y < -this.r * 1.2 || this.life > this.maxLife) {
                            this.triggerPop();
                        }

                        if (this.pop) {
                            this.popProg += dt * 3.2;
                            if (this.popProg >= 1) this.dead = true;
                        }
                    },

                    triggerPop() {
                        if (!this.pop) {
                            this.pop = true;
                            const shardN = Math.min(18, Math.max(8, Math.round(this.r / 2)));
                            for (let i = 0; i < shardN; i++) {
                                const ang = (i / shardN) * Math.PI * 2;
                                const spd = 60 + Math.random() * 140;
                                bubbleSystem.shards.push({
                                    x: this.x, y: this.y,
                                    vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                                    hue: this.hue,
                                    life: 0, max: 0.6 + Math.random() * 0.5,
                                    r: 1.2 + Math.random() * 2.2, dead: false,

                                    update(dt) {
                                        this.life += dt;
                                        const f = 1 - dt * 1.5;
                                        this.vx *= f; this.vy *= f;
                                        this.vy += 90 * dt;
                                        this.x += this.vx * dt; this.y += this.vy * dt;
                                        if (this.life > this.max) this.dead = true;
                                    },

                                    draw(ctx) {
                                        const a = Math.max(0, 1 - this.life / this.max);
                                        ctx.save();
                                        ctx.globalCompositeOperation = 'lighter';
                                        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
                                        grad.addColorStop(0, `hsla(${this.hue}, 90%, 60%, ${0.35 * a})`);
                                        grad.addColorStop(1, `hsla(${this.hue}, 90%, 60%, 0)`);
                                        ctx.fillStyle = grad;
                                        ctx.beginPath();
                                        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                });
                            }
                        }
                    },

                    draw(ctx) {
                        ctx.save();
                        ctx.translate(this.x, this.y);

                        // 使用参考页面的渐变效果
                        const grad = ctx.createRadialGradient(
                            -this.r * 0.35, -this.r * 0.35, this.r * 0.2,
                            0, 0, this.r
                        );
                        grad.addColorStop(0, `hsla(${this.hue}, 85%, 95%, ${this.alpha})`);
                        grad.addColorStop(0.6, `hsla(${this.hue}, 75%, 70%, ${this.alpha * 0.45})`);
                        grad.addColorStop(1, `hsla(${this.hue}, 80%, 65%, 0)`);

                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
                        ctx.fill();

                        // 高光效果（参考页面样式）
                        ctx.globalAlpha = Math.min(0.4, this.alpha + 0.1);
                        ctx.fillStyle = 'rgba(255,255,255,0.6)';
                        ctx.beginPath();
                        ctx.ellipse(-this.r * 0.35, -this.r * 0.45, this.r * 0.22, this.r * 0.16, -0.4, 0, Math.PI * 2);
                        ctx.fill();

                        // 边框
                        ctx.lineWidth = Math.max(1, this.r * 0.06);
                        ctx.strokeStyle = `hsla(${this.hue + 40}, 85%, 70%, ${this.alpha * 0.5})`;
                        ctx.stroke();

                        ctx.restore();
                    }
                };
            },

            clearBubbles() {
                console.log('Clearing all bubbles');
                this.bubbles.splice(0, this.bubbles.length);
                this.shards.splice(0, this.shards.length);
            },

            updateSettings(newSettings) {
                Object.assign(this.settings, newSettings);
                console.log('Settings updated:', this.settings);
            },

            update(dt) {
                if (!this.isActive) return;

                for (let i = this.bubbles.length - 1; i >= 0; i--) {
                    const b = this.bubbles[i];
                    b.update(dt, this.W, this.H);
                    if (b.dead) this.bubbles.splice(i, 1);
                }

                for (let i = this.shards.length - 1; i >= 0; i--) {
                    const s = this.shards[i];
                    s.update(dt);
                    if (s.dead) this.shards.splice(i, 1);
                }
            },

            draw() {
                if (!this.isActive) return;

                this.ctx.clearRect(0, 0, this.W, this.H);

                for (const s of this.shards) s.draw(this.ctx);
                for (const b of this.bubbles) b.draw(this.ctx);
            },

            startAnimation() {
                let last = performance.now();
                const tick = (now) => {
                    const dt = Math.min(0.033, (now - last) / 1000);
                    last = now;

                    this.update(dt);
                    this.draw();

                    requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }
        };

        // 初始化泡泡系统
        bubbleSystem.init();

        // 为A和B按钮添加泡泡控制功能
        const btnA = $('.btn[title="A - 喷射泡泡"]');
        const btnB = $('.btn[title="B - 清除泡泡"]');
        const btnSettings = $('#btn-settings');
        const ovSettings = $('#overlay-settings');

        console.log('Button A found:', !!btnA);
        console.log('Button B found:', !!btnB);
        console.log('Settings button found:', !!btnSettings);

        // A按钮 - 喷射泡泡
        if (btnA) {
            btnA.addEventListener('click', () => {
                console.log('A button clicked - spawning bubbles');
                if (bubbleSystem) {
                    bubbleSystem.spawnBubbles(20);
                }
            });
        }

        // B按钮 - 清除泡泡
        if (btnB) {
            btnB.addEventListener('click', () => {
                console.log('B button clicked - clearing bubbles');
                if (bubbleSystem) {
                    bubbleSystem.clearBubbles();
                }
            });
        }

        // 设置按钮
        if (btnSettings) {
            btnSettings.addEventListener('click', () => {
                console.log('Settings button clicked');
                if (ovSettings) {
                    toggle(ovSettings);
                }
            });
        }

        // 关闭设置面板
        const closeSettings = $('#close-settings');
        if (closeSettings) {
            closeSettings.addEventListener('click', () => {
                if (ovSettings) {
                    ovSettings.classList.remove('show');
                    ovSettings.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // 背景点击关闭设置面板
        if (ovSettings) {
            ovSettings.addEventListener('click', (e) => {
                if (e.target.classList.contains('backdrop')) {
                    ovSettings.classList.remove('show');
                    ovSettings.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // 绑定设置滑块事件
        const densitySlider = $('#density-slider');
        const sizeSlider = $('#size-slider');
        const liftSlider = $('#lift-slider');
        const colorSlider = $('#color-slider');

        const densityValue = $('#density-value');
        const sizeValue = $('#size-value');
        const liftValue = $('#lift-value');
        const colorValue = $('#color-value');
        const colorPreview = $('#color-preview');

        // 密度滑块
        if (densitySlider) {
            densitySlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                densityValue.textContent = value;
                bubbleSystem.updateSettings({ density: value });
            });
        }

        // 大小滑块
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                sizeValue.textContent = value;
                bubbleSystem.updateSettings({ size: value });
            });
        }

        // 上升速度滑块
        if (liftSlider) {
            liftSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                liftValue.textContent = value;
                bubbleSystem.updateSettings({ lift: value });
            });
        }

        // 颜色滑块
        if (colorSlider) {
            colorSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                colorValue.textContent = value;
                bubbleSystem.updateSettings({ hueBase: value });

                // 更新颜色预览
                if (colorPreview) {
                    const hue1 = value;
                    const hue2 = (value + 30) % 360;
                    const hue3 = (value + 60) % 360;
                    colorPreview.style.background = `linear-gradient(90deg, 
                        hsl(${hue1}, 70%, 70%), 
                        hsl(${hue2}, 70%, 70%), 
                        hsl(${hue3}, 70%, 70%)
                    )`;
                }
            });
        }

        // 重置按钮
        const resetBtn = $('#reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const defaults = { density: 40, size: 26, lift: 120, hueBase: 200 };
                bubbleSystem.updateSettings(defaults);

                // 更新UI
                densitySlider.value = defaults.density;
                sizeSlider.value = defaults.size;
                liftSlider.value = defaults.lift;
                colorSlider.value = defaults.hueBase;

                densityValue.textContent = defaults.density;
                sizeValue.textContent = defaults.size;
                liftValue.textContent = defaults.lift;
                colorValue.textContent = defaults.hueBase;

                // 更新颜色预览
                if (colorPreview) {
                    colorPreview.style.background = `linear-gradient(90deg, 
                        hsl(200, 70%, 70%), 
                        hsl(230, 70%, 70%), 
                        hsl(260, 70%, 70%)
                    )`;
                }

                console.log('Settings reset to defaults');
            });
        }

        // 测试效果按钮
        const testBtn = $('#test-bubbles');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                bubbleSystem.clearBubbles();
                setTimeout(() => {
                    bubbleSystem.spawnBubbles(15);
                    console.log('Test bubbles spawned with current settings');
                }, 100);
            });
        }

    } catch (error) {
        console.error('Failed to initialize bubble system:', error);
    }
}

// 多种方式确保初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBubbleSystem);
} else {
    // DOM已经加载完成，直接初始化
    setTimeout(initializeBubbleSystem, 100);
}

// 备用初始化
window.addEventListener('load', () => {
    if (!bubbleSystem) {
        console.log('Backup initialization triggered');
        setTimeout(initializeBubbleSystem, 200);
    }
});