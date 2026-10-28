// characters.js - 修复版

document.addEventListener('DOMContentLoaded', function() {
    console.log('角色页面已加载，开始初始化...');
    
    // 1. 角色筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const characterCards = document.querySelectorAll('.character-card');
    
    console.log('找到筛选按钮:', filterButtons.length);
    console.log('找到角色卡片:', characterCards.length);
    
    // 筛选按钮点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('点击了筛选按钮:', this.textContent);
            
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前按钮添加active类
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            console.log('筛选条件:', filter);
            
            // 显示/隐藏角色卡片
            characterCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    if (card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // 2. 角色搜索功能
    const characterSearch = document.getElementById('characterSearch');
    if (characterSearch) {
        characterSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('搜索关键词:', searchTerm);
            
            characterCards.forEach(card => {
                const characterName = card.getAttribute('data-name').toLowerCase();
                
                if (characterName.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // 3. 角色详情模态框
    const detailButtons = document.querySelectorAll('.detail-btn');
    const characterModal = document.getElementById('characterModal');
    const closeModal = document.querySelector('.close-modal');
    
    console.log('找到详情按钮:', detailButtons.length);
    
    if (detailButtons.length > 0) {
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('点击了详情按钮');
                const characterId = this.getAttribute('data-character');
                
                // 简单显示模态框
                if (characterModal) {
                    characterModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // 简单显示角色信息
                    const modalBody = document.getElementById('modalBody');
                    if (modalBody) {
                        modalBody.innerHTML = `
                            <h3>角色详情功能已启用</h3>
                            <p>点击的角色ID: ${characterId}</p>
                            <p>详细功能需要完整的数据支持，当前为演示模式。</p>
                            <button onclick="document.getElementById('characterModal').style.display='none'; document.body.style.overflow='auto';" style="padding:10px 20px; background:#8b0000; color:white; border:none; border-radius:5px;">关闭</button>
                        `;
                    }
                }
            });
        });
    }
    
    // 关闭模态框
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (characterModal) {
                characterModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === characterModal) {
            characterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('角色页面初始化完成');
});