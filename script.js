document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 自动高亮当前页面的导航链接
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 2. 导航栏滚动变色 (仅在 index.html 生效)
    const navbar = document.getElementById('navbar');
    if (!document.body.classList.contains('sub-page')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. 移动端菜单切换
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
                icon.style.color = 'var(--brand-primary)';
            } else {
                icon.classList.replace('ph-x', 'ph-list');
                // 菜单关闭时，根据页面状态恢复颜色
                if (!document.body.classList.contains('sub-page') && !navbar.classList.contains('scrolled')) {
                    icon.style.color = '#fff';
                } else {
                    icon.style.color = 'var(--brand-primary)';
                }
            }
        });
    }

    // 4. 滚动显现动画 (Scroll Reveal)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
