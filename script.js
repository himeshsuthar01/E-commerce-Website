
// ========================================
// MAISON AUREA - FRONTEND DEMO
// JAVASCRIPT INTERACTIONS
// ========================================


// ========================================
// 1. PRODUCT DATA
// ========================================

const PRODUCTS = [

    {
        id: 1,
        name: "The Form Coat",
        desc: "Soft camel · Wool blend",
        price: 12900,
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        tag: "BESTSELLER"
    },

    {
        id: 2,
        name: "The Everyday Bag",
        desc: "Espresso · Italian leather",
        price: 9800,
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "The Sunday Knit",
        desc: "Oatmeal · Organic cotton",
        price: 6400,
        img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "The Line Loafer",
        desc: "Dark chocolate · Leather",
        price: 7200,
        img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "The Studio Shirt",
        desc: "Ivory · Cotton poplin",
        price: 4900,
        img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "The Weekend Tote",
        desc: "Natural · Textured canvas",
        price: 3900,
        img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "The Column Dress",
        desc: "Stone · Fluid crepe",
        price: 8900,
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "The Classic Belt",
        desc: "Chocolate · Italian leather",
        price: 3200,
        img: "https://images.unsplash.com/photo-1624222247344-550fb8f3f7d3?auto=format&fit=crop&w=800&q=80"
    }

];


// ========================================
// 2. PRICE FORMAT
// ========================================

const money = n => "₹" + Number(n).toLocaleString("en-IN");


// ========================================
// 3. LOCAL STORAGE - SHOPPING BAG
// ========================================

// Get shopping bag data

const getBag = () => {

    try {

        return JSON.parse(
            localStorage.getItem("aureaBag") || "[]"
        );

    } catch (e) {

        return [];

    }

};


// Save shopping bag data

const saveBag = bag => {

    localStorage.setItem(
        "aureaBag",
        JSON.stringify(bag)
    );

    updateBagCount();

};


// ========================================
// 4. UPDATE BAG COUNT
// ========================================

function updateBagCount() {

    const count = getBag().reduce(
        (sum, item) => sum + item.qty,
        0
    );

    document.querySelectorAll(".bag-count").forEach(el => {

        el.textContent = count;

    });

}


// ========================================
// 5. ADD PRODUCT TO BAG
// ========================================

function addToBag(id) {

    const bag = getBag();

    const found = bag.find(item => item.id === id);

    if (found) {

        found.qty++;

    } else {

        bag.push({
            id,
            qty: 1
        });

    }

    saveBag(bag);

}


// ========================================
// 6. PRODUCT CARD DESIGN
// ========================================

function productCard(p) {

    return `

        <div class="col-6 col-lg-3">

            <article class="product-card">

                <!-- PRODUCT IMAGE -->

                <a href="product.html" class="product-image d-block">

                    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}

                    <img src="${p.img}" alt="${p.name}">

                </a>


                <!-- PRODUCT INFORMATION -->

                <div class="product-meta">

                    <div>

                        <h3>
                            <a href="product.html">${p.name}</a>
                        </h3>

                        <p>${p.desc}</p>

                    </div>

                    <strong>${money(p.price)}</strong>

                </div>


                <!-- ADD TO BAG BUTTON -->

                <button class="add-button" data-add="${p.id}">

                    ADD TO BAG

                    <span>+</span>

                </button>

            </article>

        </div>

    `;

}


// ========================================
// 7. RENDER PRODUCTS
// ========================================

function renderProducts(target, items) {

    const el = document.getElementById(target);

    if (!el) return;

    el.innerHTML = items.map(productCard).join("");


    // ADD TO BAG BUTTON EVENTS

    el.querySelectorAll("[data-add]").forEach(btn => {

        btn.addEventListener("click", () => {

            addToBag(Number(btn.dataset.add));

            const old = btn.innerHTML;

            btn.innerHTML = "ADDED TO BAG <span>✓</span>";

            setTimeout(() => {

                btn.innerHTML = old;

            }, 1100);

        });

    });

}


// ========================================
// 8. RENDER SHOPPING BAG
// ========================================

function renderBag() {

    const target = document.getElementById("bagItems");

    if (!target) return;

    const bag = getBag();


    // EMPTY BAG MESSAGE

    if (!bag.length) {

        target.innerHTML = `

            <div class="empty-bag">

                <h2>Your bag is waiting.</h2>

                <p>Discover pieces made to stay.</p>

                <a class="btn-aurea mt-3" href="collection.html">

                    EXPLORE COLLECTION ↗

                </a>

            </div>

        `;

        document.getElementById("bagSubtotal").textContent = money(0);

        document.getElementById("bagTotal").textContent = money(0);

        return;

    }


    // CALCULATE TOTAL PRICE

    let total = 0;


    // DISPLAY BAG PRODUCTS

    target.innerHTML = bag.map(item => {

        const p = PRODUCTS.find(x => x.id === item.id);

        if (!p) return "";

        total += p.price * item.qty;


        return `

            <div class="bag-row">

                <img src="${p.img}" alt="${p.name}">


                <div>

                    <h3>${p.name}</h3>

                    <p>${p.desc}</p>

                    <p>Quantity: ${item.qty}</p>

                    <button class="remove-item" data-remove="${p.id}">

                        REMOVE

                    </button>

                </div>


                <strong>${money(p.price * item.qty)}</strong>

            </div>

        `;

    }).join("");


    // UPDATE SUBTOTAL AND TOTAL

    document.getElementById("bagSubtotal").textContent = money(total);

    document.getElementById("bagTotal").textContent = money(total);


    // REMOVE PRODUCT FROM BAG

    target.querySelectorAll("[data-remove]").forEach(btn => {

        btn.addEventListener("click", () => {

            saveBag(
                getBag().filter(
                    x => x.id !== Number(btn.dataset.remove)
                )
            );

            renderBag();

        });

    });

}


// ========================================
// 9. RENDER CHECKOUT SUMMARY
// ========================================

function renderCheckout() {

    const target = document.getElementById("checkoutItems");

    if (!target) return;

    const bag = getBag();

    let total = 0;


    // DISPLAY CHECKOUT PRODUCTS

    target.innerHTML = bag.map(item => {

        const p = PRODUCTS.find(x => x.id === item.id);

        if (!p) return "";

        total += p.price * item.qty;


        return `

            <div class="checkout-item">

                <span>${p.name} × ${item.qty}</span>

                <strong>${money(p.price * item.qty)}</strong>

            </div>

        `;

    }).join("") || "<p class='muted small'>Your bag is currently empty.</p>";


    // UPDATE CHECKOUT TOTAL

    ["checkoutSubtotal", "checkoutTotal"].forEach(id => {

        document.getElementById(id).textContent = money(total);

    });

}


// ========================================
// 10. RENDER FOOTER
// ========================================

function renderFooter() {

    const f = document.getElementById("siteFooter");

    if (!f) return;


    f.innerHTML = `

        <footer class="site-footer">


            <!-- FOOTER BRAND -->

            <div class="footer-brand">

                <a href="index.html">MAISON AUREA</a>

                <p>
                    Quietly remarkable.<br>
                    Considered by design.
                </p>

            </div>


            <!-- EXPLORE LINKS -->

            <div class="footer-column">

                <h4>EXPLORE</h4>

                <a href="collection.html">Collection</a>

                <a href="index.html#story">Our story</a>

                <a href="index.html#journal">Journal</a>

            </div>


            <!-- CLIENT CARE LINKS -->

            <div class="footer-column">

                <h4>CLIENT CARE</h4>

                <a href="account.html">My account</a>

                <a href="bag.html">Shopping bag</a>

                <a href="checkout.html">Checkout</a>

            </div>


            <!-- SOCIAL LINKS -->

            <div class="footer-column">

                <h4>FOLLOW ALONG</h4>

                <a href="#">Instagram ↗</a>

                <a href="#">Pinterest ↗</a>

            </div>


            <!-- FOOTER BOTTOM -->

            <div class="footer-bottom">

                <span>
                    © ${new Date().getFullYear()} MAISON AUREA. ALL RIGHTS RESERVED.
                </span>

                <span>
                    MADE WITH INTENTION.
                </span>

            </div>

        </footer>

    `;

}


// ========================================
// 11. DOM CONTENT LOADED
// ========================================

document.addEventListener("DOMContentLoaded", () => {


    // INITIAL PAGE SETUP

    updateBagCount();

    renderFooter();


    // HOME PAGE PRODUCTS

    renderProducts(
        "homeProducts",
        PRODUCTS.slice(0, 4)
    );


    // COLLECTION PAGE PRODUCTS

    renderProducts(
        "collectionProducts",
        PRODUCTS
    );


    // ====================================
    // 12. PRODUCT SORTING
    // ====================================

    const sort = document.getElementById("sortProducts");

    if (sort) {

        sort.addEventListener("change", () => {

            let list = [...PRODUCTS];

            if (sort.value === "low") {

                list.sort((a, b) => a.price - b.price);

            }

            if (sort.value === "high") {

                list.sort((a, b) => b.price - a.price);

            }

            renderProducts("collectionProducts", list);

        });

    }


    // ====================================
    // 13. PRODUCT SIZE SELECTION
    // ====================================

    document.querySelectorAll(".size-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".size-btn").forEach(b => {

                b.classList.remove("active");

            });

            btn.classList.add("active");

        });

    });


    // ====================================
    // 14. PRODUCT DETAIL ADD TO BAG
    // ====================================

    const detail = document.getElementById("detailAdd");

    if (detail) {

        detail.addEventListener("click", () => {

            addToBag(1);

            detail.innerHTML = "ADDED TO BAG ✓";

        });

    }


    // ====================================
    // 15. RENDER BAG AND CHECKOUT
    // ====================================

    renderBag();

    renderCheckout();


    // ====================================
    // 16. NEWSLETTER FORM
    // ====================================

    document.querySelectorAll(".newsletter-form").forEach(form => {

        form.addEventListener("submit", e => {

            e.preventDefault();

            form.querySelector(".form-message").textContent =
                "Thank you — you are on the list.";

            form.reset();

        });

    });


    // ====================================
    // 17. CHECKOUT FORM
    // ====================================

    const checkout = document.getElementById("checkoutForm");

    if (checkout) {

        checkout.addEventListener("submit", e => {

            e.preventDefault();

            document.getElementById("checkoutMessage").textContent =
                "Demo order placed! No payment was processed.";

            localStorage.removeItem("aureaBag");

            updateBagCount();

            renderCheckout();

        });

    }


    // ====================================
    // 18. ACCOUNT SIGN IN FORM
    // ====================================

    const account = document.getElementById("accountForm");

    if (account) {

        account.addEventListener("submit", e => {

            e.preventDefault();

            document.getElementById("accountMessage").textContent =
                "Demo sign-in submitted. No account data was sent or saved.";

        });

    }


    // ====================================
    // 19. CREATE ACCOUNT
    // ====================================

    const create = document.getElementById("createAccount");

    if (create) {

        create.addEventListener("click", e => {

            e.preventDefault();

            document.getElementById("accountMessage").textContent =
                "Account registration is a visual demo only.";

        });

    }

});
