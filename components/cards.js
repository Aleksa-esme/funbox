const product = Vue.component('product', {
    data() {
        return {
            notSelected: 'Сказочное заморское яство',
            selected: 'Котэ не одобряет?'
        }
    },
    props: ['product'],
    methods: {
        checkDeclination(number, txt, cases = [2, 0, 1, 1, 1, 2]) {
            return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]] 
        },
        chooseProduct(product) {
            product.isSelected = !product.isSelected;
            if (product.isSelected === false) {
                this.originalText(product);
            }
        },
        changeText(product) {
            if (!!product.isSelected) {
                product.title = this.selected;
            }
        },
        originalText(product) {
            product.title = this.notSelected;
        }
    },
    template: `
        <div 
            class="card-block"
        >
            <button 
                class="card-block__button-field" 
                @click="chooseProduct(product)" 
                :disabled='!product.inStock'
            >
                <div 
                    v-bind:class="['card-border', { active: !!product.isSelected }, { 'card-border-mask': !product.inStock } ]" 
                >            
                    <div
                        v-bind:class="[!product.inStock ? 'card-mask' : '','card']"
                        v-on:mouseover="(event) => changeText(product)"
                        v-on:mouseleave="() => originalText(product)"
                    >
                        <div class="card-text">
                            <p 
                                v-if="product.title == this.notSelected"
                                class="card-text__title"
                            >
                                {{ product.title }}
                            </p>
                            <p 
                                v-else="product.title == this.selected"
                                class="card-text__title card-text__title-hovered"
                            >
                                {{ product.title }}
                            </p>
                            <h2 class="card-text__brand">Нямушка</h2>
                            <h3 class="card-text__taste">{{ product.taste }}</h3>
                            <p class="card-text__detail">
                                <span>{{ product.portions }}</span> {{ checkDeclination(product.portions, ['порция', 'порции', 'порций']) }}
                            </p>
                            <p 
                                v-if="product.gift > 0" 
                                class="card-text__detail"
                            >
                                <span v-if="product.gift > 1">
                                    {{ product.gift }}
                                </span>
                                <span v-else="product.gift = 1"></span>
                                <span>{{ checkDeclination(product.gift, ['мышь', 'мыши', 'мышей']) }}</span> в подарок
                            </p>
                            <p 
                                v-if="product.weight >= 5" 
                                class="card-text__detail"
                            >
                                заказчик доволен
                            </p>
                        </div>
                        <div v-bind:class="['card-weight', { active: !!product.isSelected }, { 'card-weight-mask': !product.inStock }]">
                            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="40"/>
                            </svg>
                            <div class="card-weight__text">
                                <p class="card-weight__text-value">{{ product.weight }}</p>
                                <p class="card-weight__text-measure">кг</p>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            <p v-if="!!product.inStock && !product.isSelected"
                class="card-block__text"
            >
                Чего сидишь? Порадуй котэ, 
                <button 
                    class="card-block__button" 
                    @click="chooseProduct(product)"
                    :disabled='!product.inStock'
                >
                    купи
                </button><span>.</span>
            </p>
            <p v-if="!!product.inStock && !!product.isSelected"
                class="card-block__text"
            >
                {{ product.description }}
            </p>
            <p v-if="!product.inStock"
                class="card-block__text card-block__text-notInStock"
            >
                Печалька, {{ product.taste }} закончился.
            </p>
        </div>
    `
})
const cards = Vue.component('cards', {
    components: { product },
    data () {
        return {
            products: [],
        }
    },
    mounted () {
        this.$parent.getJson(`../getProducts.json`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
           });
    },
    template: `
                <div>
                    <section class="container">
                        <h1>Ты сегодня покормил кота?</h1>
                        <product 
                            v-for="product of products" 
                            :key="product.id_product"
                            :product="product"
                        >
                        </product>
                    </section>
                </div>
    `
})