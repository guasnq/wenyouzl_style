// 霜风裹挟晶光 - 脚本文件
document.addEventListener('DOMContentLoaded', function() {
  // 粒子效果配置
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#a8dadd", "#f0e6d2", "#ff9aa2"]
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": true
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#a8dadd",
        "opacity": 0.1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "top",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.3
          }
        },
        "push": {
          "particles_nb": 3
        }
      }
    },
    "retina_detect": true
  });
  
  // 状态栏切换功能
  const statusBar = document.getElementById('status-bar');
  const toggleBtn = document.getElementById('toggle-status');
  let statusVisible = false;
  
  toggleBtn.addEventListener('click', function() {
    statusVisible = !statusVisible;
    statusBar.style.transform = statusVisible ? 'translateX(0)' : 'translateX(-100%)';
    toggleBtn.innerHTML = statusVisible ? 
      '<i class="fa fa-times text-ice-blue"></i>' : 
      '<i class="fa fa-sliders text-ice-blue"></i>';
  });
  
  // 行动按钮点击效果
  const actionButtons = document.querySelectorAll('.grid button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('scale-95', 'opacity-80');
      setTimeout(() => this.classList.remove('scale-95', 'opacity-80'), 200);
    });
  });
});