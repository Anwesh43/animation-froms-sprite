class SpriteAnimator extends HTMLElement{
    constructor(src) {
        super()
        this.src = this.getAttribute('src')
        this.rows = this.getAttribute('rows') || 0
        this.cols = this.getAttribute('cols') || 0
        this.xoffset = this.getAttribute('xoffset') || 0
        this.yoffset = this.getAttribute('yoffset') || 0
        this.img = document.createElement('img')
        this.delay = this.getAttribute('delay') || 100
        this.state = {x:0,y:0}
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        console.log(this.xoffset)
        console.log(this.yoffset)
    }
    setState(obj) {
        this.state = Object.assign({},this.state,obj)
    }
    render() {
        const w = this.state.w, h = this.state.h
        var spriteW = w ,spriteH = h,x = this.state.x,y = this.state.y
        if(this.rows != 0) {
            spriteH = h/(this.rows)
        }
        if(this.cols != 0) {
            spriteW=w/this.cols
        }
        const canvas = document.createElement('canvas')
        canvas.width = spriteW*(1-this.xoffset)
        canvas.height = spriteH*(1-this.yoffset)
        const context = canvas.getContext('2d')
        context.clearRect(0,0,spriteW*(1-this.xoffset),spriteH*(1-this.yoffset))
        context.save()
        context.translate(-x,-y)
        context.drawImage(this.image,0,0)
        context.restore()
        x += spriteW
        if(x >= w) {

            x = 0
            y += spriteH
            if(y >= h) {
                y = 0
                console.log("coming here"+this.src)
            }
        }
        this.setState({x,y})
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () => {
            this.setState({w:this.image.width,h:this.image.height})
            const interval = setInterval(()=>{
                this.render()
            },this.delay)
        }
    }
}
customElements.define('sprite-animator',SpriteAnimator)
