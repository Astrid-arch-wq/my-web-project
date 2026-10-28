// JavaScript Document// 攻略页面专属功能
document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮和内容的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 为当前按钮添加active类
            this.classList.add('active');
            
            // 显示对应的内容
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    
    // 表格行悬停效果
    const tableRows = document.querySelectorAll('tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(139, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // 卡片入场动画
    const cards = document.querySelectorAll('.basic-card, .tip-card, .map-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 提示卡片展开/收起功能（可选）
    const tipHeaders = document.querySelectorAll('.tip-card h3');
    tipHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        
        header.addEventListener('click', function() {
            const tipContent = this.nextElementSibling;
            tipContent.classList.toggle('expanded');
            
            if (tipContent.classList.contains('expanded')) {
                tipContent.style.maxHeight = tipContent.scrollHeight + 'px';
            } else {
                tipContent.style.maxHeight = '200px';
            }
        });
    });
    
    // 初始设置提示内容高度
    document.querySelectorAll('.tip-content').forEach(content => {
        content.style.maxHeight = '200px';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease';
    });
    
    console.log('攻略页面功能已加载！');
});