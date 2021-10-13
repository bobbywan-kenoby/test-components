app.component('advanced-image', {
    props: {
        canvas_size: {
            type: Number,
            default: 50
        },
        image_size: {
            type: Number,
            default: 500
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {imageFocus: false, x: 0, y: 0, scrollX: 0, scrollY: 0};
    },
    template: `
    <div class="advanced-image" :style="{padding: (canvas_size/2)+'px', borderRadius: (canvas_size/2)+'px'}" @mousemove="getMousePos($event)" @mouseenter="imageFocus=true" @mouseleave="imageFocus=false">
        <canvas :id="name" class="inspect-image" :style="canvasStyle" v-if="imageFocus"></canvas>
        <img :id="name+'-source'" v-show="false" src="./assets/images/Mozilla_Firefox_anime_girls_traditional_clothing_kimono_anime_V3-2.png">
        <img :style="imageStyle" src="./assets/images/firefox_logo_2017.png">
		<p v-if="false">{{ debug }}</p>
    </div>`,
    methods: {
        draw() {
            let image = document.getElementById(`${this.name}-source`);

            let source = document.createElement('canvas');
            source.width = this.canvas_size + this.image_size;
            source.height = this.canvas_size + this.image_size;

            let ctx = source.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, source.width, source.height);
            ctx.drawImage(image, this.canvas_size / 2, this.canvas_size / 2, this.image_size, this.image_size);

            let canvas = document.getElementById(this.name);
            canvas.width = this.canvas_size;
            canvas.height = this.canvas_size;

            ctx = canvas.getContext('2d');
            ctx.drawImage(source, this.x - this.canvas_size / 2, this.y - this.canvas_size / 2, this.canvas_size, this.canvas_size, 0, 0, this.canvas_size, this.canvas_size);
        },
        getMousePos(event) {
            console.log(event);
            let rect = event.target.getBoundingClientRect();
            this.x = event.clientX - rect.left;
            this.x = this.x <= this.canvas_size / 2
                ? this.canvas_size / 2
                : this.x;
            this.x = this.x >= this.image_size + this.canvas_size / 2
                ? this.image_size + this.canvas_size / 2
                : this.x;
            this.y = event.clientY - rect.top;
            this.y = this.y <= this.canvas_size / 2
                ? this.canvas_size / 2
                : this.y;
            this.y = this.y >= this.image_size + this.canvas_size / 2
                ? this.image_size + this.canvas_size / 2
                : this.y;
            this.scrollX = event.target.offsetLeft - this.canvas_size / 2;
            this.scrollY = event.target.offsetTop - this.canvas_size / 2;

            this.draw()
        }
    },
    computed: {
        canvasStyle() {
            return {
                top: `${this.y + this.scrollY}px`,
                left: `${this.x + this.scrollX}px`,
                width: `${this.canvas_size}px`,
                height: `${this.canvas_size}px`
            };
        },
        imageStyle() {
            return {
                width: `${this.image_size}px`,
                height: `${this.image_size}px`,
                pointerEvents: "none"
            };
        },
        debug() {
            return this.imageFocus
                ? `x = ${this.x}, y = ${this.y}, size = ${this.canvas_size}`
                : "mouse not in img";
        }
    }
});
