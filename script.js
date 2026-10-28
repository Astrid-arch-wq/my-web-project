// JavaScript Document// 等待DOM完全加载

    // =================== 背景音乐控制 ===================
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    const musicStatus = document.getElementById('musicStatus');
    
    console.log('初始化背景音乐控制...');
    
    if (musicToggle && bgMusic) {
        // 设置初始音量
        bgMusic.volume = 0.3;
        bgMusic.preload = 'auto';
        
        // 更新按钮状态
        function updateMusicButton() {
            if (bgMusic.paused) {
                musicIcon.className = 'fas fa-volume-mute';
                musicText.textContent = '播放音乐';
                musicStatus.textContent = '音乐已暂停';
            } else {
                musicIcon.className = 'fas fa-volume-up';
                musicText.textContent = '关闭音乐';
                musicStatus.textContent = '正在播放背景音乐';
            }
        }
        
        // 播放音乐函数（带错误处理）
        function playMusic() {
            console.log('尝试播放音乐...');
            bgMusic.play()
                .then(() => {
                    console.log('音乐播放成功');
                    updateMusicButton();
                })
                .catch(error => {
                    console.error('音乐播放失败:', error);
                    musicStatus.innerHTML = 
                        '播放失败: ' + error.name + '<br>' +
                        '提示: 请先点击页面任意位置激活音频';
                    
                    // 如果是因为用户未交互导致的，添加一次性的交互监听
                    if (error.name === 'NotAllowedError') {
                        const enableMusic = function() {
                            console.log('用户已交互，重新尝试播放音乐');
                            bgMusic.play().then(() => {
                                updateMusicButton();
                                musicStatus.textContent = '音乐已开始播放';
                            }).catch(e => {
                                console.error('再次尝试播放失败:', e);
                            });
                            
                            // 移除事件监听器，避免重复绑定
                            document.removeEventListener('click', enableMusic);
                            document.removeEventListener('keydown', enableMusic);
                        };
                        
                        // 等待用户与页面交互
                        document.addEventListener('click', enableMusic, { once: true });
                        document.addEventListener('keydown', enableMusic, { once: true });
                    }
                });
        }
        
        // 暂停音乐函数
        function pauseMusic() {
            bgMusic.pause();
            updateMusicButton();
        }
        
        // 按钮点击事件
        musicToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // 防止事件冒泡
            
            if (bgMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
        
        // 初始状态
        updateMusicButton();
        
        // 页面加载后尝试自动播放（很多浏览器会阻止）
        setTimeout(() => {
            console.log('尝试自动播放背景音乐...');
            playMusic();
        }, 1000);
        
        // 监听音频错误
        bgMusic.addEventListener('error', function(e) {
            console.error('音频加载错误:', bgMusic.error);
            musicStatus.innerHTML = 
                '音频加载失败<br>' +
                '错误代码: ' + bgMusic.error.code + '<br>' +
                '可能原因: 文件不存在或格式不支持';
        });
        
        // 监听音频加载完成
        bgMusic.addEventListener('loadeddata', function() {
            console.log('音频文件已加载');
            musicStatus.textContent = '音频文件已加载，点击按钮播放';
        });
        
        // 添加全局点击激活音频（解决Chrome等浏览器的自动播放限制）
        document.addEventListener('click', function activateAudio() {
            console.log('页面被点击，尝试激活音频上下文');
            
            // 如果音频是暂停状态且用户还没播放过，尝试播放然后立即暂停
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    console.log('音频上下文已激活');
                    bgMusic.pause();
                    musicStatus.textContent = '音频已激活，可以播放了';
                }).catch(e => {
                    console.log('激活音频上下文失败:', e);
                });
            }
            
            // 移除事件监听，避免重复
            document.removeEventListener('click', activateAudio);
        }, { once: true });
        
        console.log('音乐控制初始化完成');
    } else {
        console.error('音乐控制元素未找到');
    }
});
    
    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // 点击菜单项后关闭菜单
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    
    
    // 视频控制
    const gameVideo = document.getElementById('gameVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    
    if (gameVideo && playBtn) {
        playBtn.addEventListener('click', function() {
            gameVideo.play();
        });
    }
    
    if (gameVideo && pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            gameVideo.pause();
        });
    }
    
    if (gameVideo && muteBtn) {
        muteBtn.addEventListener('click', function() {
            if (gameVideo.muted) {
                gameVideo.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> 静音';
            } else {
                gameVideo.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> 取消静音';
            }
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        }
    });
    
    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.feature-card, .basic-card, .tip-card, .map-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // 页面加载动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    console.log('第五人格网站已加载完毕！');
});