         var swiper = new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",

            },
        });
 
        
        async function fetchBooks(query) {
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 50
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "KakaoAK 4f20aca4f4ec714a883088019b5e84fe"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류!: ${response.status}`);
            }

            return response.json();


        }

        async function bookData() {
            try {
                const querys = ['심리학', '소설', '에세이', '역사', '숲', '바다',];

                querys.forEach(async (query, i) => {
                    const data = await fetchBooks(query);

                    const booksImg = $('section').eq(i).find('.book_img');
                    const booksInf = $('section').eq(i).find('.book_inf');

                    for (let j = 0; j < booksImg.length; j++) {
                        booksImg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
                    }
                    for (let j = 0; j < booksInf.length; j++) {
                        booksInf.eq(j).append("<div><h4>" + data.documents[j].title + "</h4><p>" + data.documents[j].authors + "</p></div>");
                    }



                    const bookDetail = $('section').eq(i).find('.book_detail');

                    for (let j = 0; j < bookDetail.length; j++) {
                        bookDetail.eq(j).append("<a href='#'><img src=" + data.documents[j].thumbnail + "></a>");
                        bookDetail.eq(j).append("<h3>" + (j + 1) + "</h3>");

                        bookDetail.eq(j).append("<div>" + "<h4>" + data.documents[j].title + "</h4>" + "<h5>" + data.documents[j].authors + "</h5>" + "</div>");
                    }



                    const booksIg = $('section').eq(i).find('.books_Img');
                    const booksText = $('section').eq(i).find('.books_text');

                    for (let j = 0; j < booksIg.length; j++) {
                        booksIg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
                    }
                    for (let j = 0; j < booksText.length; j++) {
                        booksText.eq(j).append("<h4><" + data.documents[j].title + "></h4>");
                        booksText.eq(j).append("<p>" + data.documents[j].authors + "</p>");
                    }



                })
            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bookData();







   