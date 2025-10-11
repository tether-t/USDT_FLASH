// وظائف شهادات العملاء

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة شهادات العملاء
    let slideIndex = 1;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // إنشاء النقاط
    if (slides.length > 0 && dotsContainer) {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = function() { currentSlide(i + 1); };
            dotsContainer.appendChild(dot);
        }
    }
    
    // إضافة مستمعي الأحداث لأزرار التنقل
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            plusSlides(-1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            plusSlides(1);
        });
    }
    
    // Add event listeners for language toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-lang');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const slide = this.closest('.testimonial-slide');
            const testimonials = slide.querySelectorAll('p.mb-4.min-h-\\[80px\\]');
            
            testimonials.forEach(testimonial => {
                testimonial.classList.toggle('hidden');
            });
            
            // Toggle between languages based on current text
            if (this.textContent === 'English') {
                this.textContent = 'العربية';
            } else if (this.textContent === 'العربية') {
                this.textContent = 'English';
            } else if (this.textContent === 'Русский') {
                this.textContent = 'English';
            }
        });
    });
    
    // Add event listeners for language selection buttons
    const languageSelectButtons = document.querySelectorAll('.language-select-btn');
    languageSelectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            document.getElementById('comment-language').value = lang;
            
            // Highlight the selected language button
            languageSelectButtons.forEach(btn => {
                btn.classList.remove('ring-2', 'ring-offset-2');
            });
            this.classList.add('ring-2', 'ring-offset-2');
        });
    });
    
    // عرض الشريحة الأولى
    showSlides(slideIndex);
    
    // تشغيل العرض التلقائي
    let slideInterval = setInterval(function() { plusSlides(1); }, 15000);
    
    // إيقاف العرض التلقائي عند تمرير المؤشر فوق الشرائح
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() { plusSlides(1); }, 15000);
        });
    }
    
    // وظائف التنقل بين الشرائح
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
        let i;
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        slides[slideIndex-1].classList.add('active');
        dots[slideIndex-1].classList.add('active');
    }
    
    // إضافة وظائف نموذج التعليق
    const addTestimonialBtn = document.getElementById('add-testimonial-btn');
    const testimonialForm = document.getElementById('testimonial-form');
    const cancelTestimonialBtn = document.getElementById('cancel-testimonial');
    const submitTestimonialBtn = document.getElementById('submit-testimonial');
    const successMessage = document.getElementById('success-message');
    const userRatingStars = document.querySelectorAll('.user-rating i');
    const ratingText = document.getElementById('rating-text');
    
    let userRating = 0;
    
    // إظهار/إخفاء نموذج التعليق
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', function() {
            // إنشاء نافذة منبثقة
            const modal = document.createElement('div');
            modal.id = 'testimonial-modal';
            modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4';
            
            modal.innerHTML = `
                <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 overflow-hidden max-h-screen overflow-y-auto">
                    <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 py-3 sm:py-4 text-white relative">
                        <button class="close-modal absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center">
                            <i class="fas fa-times text-xs sm:text-sm"></i>
                        </button>
                        <h3 class="text-lg sm:text-xl font-bold">Share Your Experience</h3>
                        <p class="text-green-100 text-xs sm:text-sm">Help others with your USDT-FLASH review</p>
                    </div>
                    
                    <div class="p-3 sm:p-6 space-y-3 sm:space-y-4">
                        <div>
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input type="text" class="modal-name w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your full name">
                        </div>
                        
                        <div>
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Language</label>
                            <select class="modal-language w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option value="en">🇺🇸 English</option>
                                <option value="ar">🇸🇦 العربية</option>
                                <option value="ru">🇷🇺 Русский</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Rate Your Experience</label>
                            <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                <div class="rating-stars flex items-center justify-center space-x-1 sm:space-x-2">
                                    <i class="far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500" data-rating="1"></i>
                                    <i class="far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500" data-rating="2"></i>
                                    <i class="far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500" data-rating="3"></i>
                                    <i class="far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500" data-rating="4"></i>
                                    <i class="far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500" data-rating="5"></i>
                                </div>
                                <div class="text-center mt-2">
                                    <span class="rating-text text-xs sm:text-sm font-medium text-gray-600">Click to rate</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                            <textarea class="modal-comment w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" rows="3" placeholder="Share your detailed experience with USDT-FLASH..."></textarea>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                        <button class="cancel-modal w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                        <button class="submit-modal w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg">Submit Review</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            let selectedRating = 0;
            
            // معالجة النجوم
            const stars = modal.querySelectorAll('.rating-stars i');
            const ratingText = modal.querySelector('.rating-text');
            
            stars.forEach(star => {
                star.onclick = function() {
                    selectedRating = parseInt(this.getAttribute('data-rating'));
                    updateStars(selectedRating);
                    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                    ratingText.textContent = selectedRating + '/5 - ' + texts[selectedRating];
                };
            });
            
            function updateStars(rating) {
                stars.forEach((star, index) => {
                    if (index < rating) {
                        star.className = 'fas fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500';
                    } else {
                        star.className = 'far fa-star text-yellow-400 text-xl sm:text-3xl cursor-pointer hover:text-yellow-500';
                    }
                });
            }
            
            // إغلاق النافذة
            function closeModal() {
                document.body.removeChild(modal);
            }
            
            modal.querySelector('.close-modal').onclick = closeModal;
            modal.querySelector('.cancel-modal').onclick = closeModal;
            
            // إرسال التعليق
            modal.querySelector('.submit-modal').onclick = function() {
                const name = modal.querySelector('.modal-name').value;
                const comment = modal.querySelector('.modal-comment').value;
                const language = modal.querySelector('.modal-language').value;
                
                if (!name || !comment || selectedRating === 0) {
                    alert('Please fill all fields and select a rating');
                    return;
                }
                
                createUserTestimonial(name, comment, selectedRating, language);
                closeModal();
                
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    setTimeout(() => successMessage.classList.add('hidden'), 3000);
                }
            };
            
            // إغلاق عند النقر خارج النافذة
            modal.onclick = function(e) {
                if (e.target === modal) closeModal();
            };
        });
    }
    
    if (cancelTestimonialBtn) {
        cancelTestimonialBtn.addEventListener('click', function() {
            testimonialForm.classList.add('hidden');
            addTestimonialBtn.classList.remove('hidden');
            resetForm();
        });
    }
    
    // تحديد التقييم بالنجوم
    userRatingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            userRating = rating;
            updateStars(rating);
            ratingText.textContent = rating + ' من 5';
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStars(rating);
        });
        
        star.addEventListener('mouseleave', function() {
            updateStars(userRating);
        });
    });
    
    // تحديث شكل النجوم
    function updateStars(rating) {
        userRatingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    // Submit testimonial
    if (submitTestimonialBtn) {
        submitTestimonialBtn.addEventListener('click', function() {
            const userName = document.getElementById('user-name').value;
            const userComment = document.getElementById('user-comment').value;
            const commentLanguage = document.getElementById('comment-language').value;
            
            if (!userName || !userComment || userRating === 0) {
                alert('Please fill in all fields and select a rating');
                return;
            }
            
            // Create user testimonial with language
            createUserTestimonial(userName, userComment, userRating, commentLanguage);
            
            // Show success message
            testimonialForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Hide success message after 3 seconds
            setTimeout(function() {
                successMessage.classList.add('hidden');
                addTestimonialBtn.classList.remove('hidden');
            }, 3000);
            
            // Reset form
            resetForm();
        });
    }
    
    // Create user testimonial
    function createUserTestimonial(name, comment, rating, language) {
        // Create slide element
        const userSlide = document.createElement('div');
        userSlide.className = 'testimonial-slide user-testimonial';
        
        // Create testimonial content
        const firstLetter = name.charAt(0).toUpperCase();
        
        // Set avatar color based on language
        let avatarColorClass = 'from-green-500 to-green-600'; // Default for Arabic
        let languageText = 'Arabic';
        
        if (language === 'en') {
            avatarColorClass = 'from-blue-500 to-blue-600';
            languageText = 'English';
        } else if (language === 'ru') {
            avatarColorClass = 'from-red-500 to-red-600';
            languageText = 'Russian';
        } else if (language === 'ar') {
            avatarColorClass = 'from-green-500 to-green-600';
            languageText = 'Arabic';
        }
        
        userSlide.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow-md">
                <div class="flex items-center mb-4">
                    <div class="user-avatar bg-gradient-to-r ${avatarColorClass} text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mr-4 shadow-lg">
                        ${firstLetter}
                    </div>
                    <div>
                        <h3 class="font-semibold">${name}</h3>
                        <span class="text-xs text-gray-500">${languageText}</span>
                    </div>
                </div>
                <p class="text-gray-600 mb-4 min-h-[80px]">"${comment}"</p>
                <div class="flex items-center">
                    <div class="rating">
                        ${getRatingStars(rating)}
                        <span class="text-yellow-500 font-semibold ml-2">${rating}.0</span>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة الشريحة إلى العرض
        const sliderContainer = document.querySelector('.testimonials-slider');
        sliderContainer.appendChild(userSlide);
        
        // إضافة نقطة جديدة
        const newDot = document.createElement('span');
        newDot.className = 'dot';
        newDot.onclick = function() { 
            currentSlide(slides.length + 1); 
        };
        dotsContainer.appendChild(newDot);
        
        // عرض تعليق المستخدم
        currentSlide(slides.length + 1);
    }
    
    // إنشاء نجوم التقييم
    function getRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star text-yellow-400"></i>';
            } else {
                stars += '<i class="far fa-star text-yellow-400"></i>';
            }
        }
        return stars;
    }
    
    // Reset form
    function resetForm() {
        document.getElementById('user-name').value = '';
        document.getElementById('user-comment').value = '';
        document.getElementById('comment-language').value = 'en';
        userRating = 0;
        updateStars(0);
        ratingText.textContent = '0 of 5';
        
        // Reset language selection buttons
        const languageSelectButtons = document.querySelectorAll('.language-select-btn');
        languageSelectButtons.forEach(btn => {
            btn.classList.remove('ring-2', 'ring-offset-2');
        });
        // Set English as default
        document.querySelector('.language-select-btn[data-lang="en"]').classList.add('ring-2', 'ring-offset-2');
    }
});
