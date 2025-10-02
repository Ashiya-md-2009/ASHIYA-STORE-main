
// js ටික කියන් තො ගහපන් අතේ 😩💗



/* ==========================
   TYPING CURSOR EFFECT
========================== */
(function(){
  const type=document.querySelector('.type');
  const cursor=document.querySelector('.cursor');
  if(type && cursor){
    const text=type.textContent.trim();
    type.textContent='';
    cursor.style.opacity='1';
    let i=0;
    const t=setInterval(()=>{
      if(i<text.length){type.textContent+=text[i++];}
      else{clearInterval(t);setTimeout(()=>cursor.style.opacity='0',600);}
    },80);
  }
})();

/* ==========================
   NAVBAR ACTIVE INDICATOR
========================== */
(function(){
  const menu=document.getElementById('menu');
  const indicator=document.getElementById('indicator');
  const links=menu.querySelectorAll('a');

  function updateIndicator(el){
    const rect=el.getBoundingClientRect();
    const parent=el.closest('nav').getBoundingClientRect();
    indicator.style.width=rect.width+'px';
    indicator.style.left=(rect.left-parent.left)+'px';
    indicator.style.opacity='1';
  }

  if(links.length) updateIndicator(links[0]);

  links.forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      links.forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      updateIndicator(a);
      const id=a.getAttribute('href');
      if(id.startsWith('#')){
        const t=document.querySelector(id);
        if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
    a.addEventListener('mouseenter',()=>updateIndicator(a));
  });

  const nav=document.querySelector('nav.navlinks');
  nav.addEventListener('mouseleave',()=>{const active=nav.querySelector('a.active')||links[0];updateIndicator(active);});
  window.addEventListener('resize',()=>{const active=nav.querySelector('a.active')||links[0];if(active) updateIndicator(active);});
})();

/* ==========================
   HAMBURGER & MOBILE PANEL
========================== */
(function(){
  const hambtn=document.getElementById('hambtn');
  const mobilePanel=document.getElementById('mobilePanel');

  function closePanel(){mobilePanel.classList.remove('show');}

  hambtn.addEventListener('click',e=>{
    e.stopPropagation();
    mobilePanel.classList.toggle('show');
  });

  mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closePanel));

  document.addEventListener('click',e=>{
    if(mobilePanel.classList.contains('show') && !mobilePanel.contains(e.target) && e.target!==hambtn){
      closePanel();
    }
  });

  window.addEventListener('resize',()=>{if(window.innerWidth>900){closePanel();}});
})();

/* ==========================
   HEADER SCROLL EFFECT
========================== */
(function(){
  const header=document.querySelector('header.nav');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      window.requestAnimationFrame(()=>{
        const sc=window.scrollY;
        header.style.transform=sc>30?'translateY(-4px) scale(0.995)':'translateY(0) scale(1)';
        header.style.boxShadow=sc>20?'0 20px 60px rgba(0,0,0,0.6)':'0 8px 40px rgba(0,0,0,0.6)';
        ticking=false;
      });
      ticking=true;
    }
  });
})();







// time clock .js 
function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // 0 => 12
      hours = hours.toString().padStart(2, '0');

      document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    setInterval(updateClock, 1000); // update every second
    updateClock(); // initial call
    
    
    
    
   
   
   
   
    
  // img display  😂
  function showGallery(images) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const gallery = document.createElement("div");
  gallery.className = "gallery";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    gallery.appendChild(img);
  });

  overlay.appendChild(gallery);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => overlay.remove());
}





 //========= Select button and Remove button now fucking bich 😩💗
 
  let cart = [];

  function updateCart() {
    let total = 0;
    const cartItemsDiv = document.getElementById("cartItems");

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "No items yet.";
    } else {
      cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price;
        return `<div>📦 ${item.name} - ${item.label} = Rs. ${item.price}</div>`;
      }).join("");
    }
    document.getElementById("total").innerText = total;
  }

  function openTextSelect(button, productName, options) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `<h3>${productName} Options</h3>`;

    options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="choice" value="${opt.price}" data-label="${opt.label}"> ${opt.label} - Rs. ${opt.price}`;
      modal.appendChild(label);
    });

    const btn = document.createElement("button");
    btn.textContent = "Select";
    btn.onclick = () => {
      const chk = modal.querySelector("input[type=radio]:checked");
      if (!chk) {
        alert("Please select one option!");
        return;
      }

      // 🟢 Card එක find කරන්න
      const card = button.closest(".card");

      // 🟢 Selected text update කරන්න
      card.querySelector(".selected-text").innerHTML =
        `${chk.dataset.label} - Rs. ${chk.value} 
         <button onclick="clearSelection(this,'${productName}')" 
         style="margin-left:10px;margin-bottom:30px;padding:3px 6px;border:none;border-radius:4px;background:red;color:#fff;font-weight:600;cursor:pointer;">Remove</button>`;

      // 🟢 Cart එක update කරන්න
      cart = cart.filter(item => item.name !== productName);
      cart.push({ name: productName, label: chk.dataset.label, price: parseInt(chk.value) });

      updateCart();
      overlay.remove();
    };

    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.remove();
    });
  }

  // 🟢 Clear selection function (FIXED)
  function clearSelection(btn, productName) {
    // Card එකේ selected-text reset කරන්න
    const card = btn.closest(".card");
    card.querySelector(".selected-text").innerText = "No selection";

    // Cart එකෙන් remove කරන්න
    cart = cart.filter(item => item.name !== productName);
    updateCart();
  }

  function sendToWhatsApp() {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let message = "*ASHIYA web store* %0A%0A";
    message += "🛒 Order:%0A";
    let total = 0;
    cart.forEach(item => {
      message += `${item.name} - ${item.label} = ${item.price} LKR%0A`;
      total += item.price;
    });
    message += `%0A💰 Total: ${total} LKR%0A%0A📌 Please reply with your payment receipt.%0A✅ Thank you!`;

    let phone = "94741856766";
    let url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  }
  
  
  
  
  
  
  // දුවන link <a> 😩============
  const OFFSET = 60; // navbar height

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const targetPosition = targetElement.offsetTop - OFFSET;

        // Smooth scroll with JS
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
