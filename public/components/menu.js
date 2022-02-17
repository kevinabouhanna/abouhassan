let menuUrl = 'https://api.sheety.co/fad9eeaf396da2056c40d6327666cac5/abouHassan/menu';
fetch(menuUrl)
    .then((response) => response.json())
    .then(json => {
        // Do something with the data
        console.log(json.menus);
    });

class Menu extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement("template");
    }

    connectedCallback() {

        this.template.innerHTML = `
    <style>
      .menu {
          background-color: red
      }
    </style>
    <div id="no__menu">

    </div>`;
        let counter = 0;
        this.renderMenu(counter);
        counter++;
        setInterval(() => {
            this.renderMenu(counter);
            counter++;
        }, 20 * 60 * 1000)

    }

    renderMenu(counter) {
        if (counter === 0) {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        }

        const myDate = new Date();
        let hrs = myDate.getHours();
        let isLight = hrs >= 4 && hrs <= 17;

        fetch(menuUrl)
            .then((response) => response.json())
            .then(({ hasMenu }) => {

                if (hasMenu) {
                    const menuContainer = `

          <div class="menu">
           
          </div>
        `;
                    if (counter === 0) {
                        this.shadowRoot.querySelector("#no__menu").insertAdjacentHTML("afterbegin", menuContainer);
                    } else {
                        this.shadowRoot.querySelector("#no__menu").innerHTML = menuContainer;
                    }
                } else {
                    const menuContainer = `
          <div class="no__menu">
            <p>no result</p>
          </div>`;
                    if (counter === 0) {
                        this.shadowRoot.querySelector("#no__menu").insertAdjacentHTML("afterbegin", menuContainer);
                    } else {
                        this.shadowRoot.querySelector("#no__menu").innerHTML = menuContainer;
                    }
                }

            });
    }

}

customElements.define('menu-component', Menu);
