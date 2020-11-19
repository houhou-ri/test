/*使い方 <hl color=""> XXXXX </hl> */
new Vue({
    el: '#app',
    components: {
        hl: highlighter(),
    },
});


function highlighter() {
    // 2) configuration
    const startLineOffset = -100;
    class Style {
        constructor(highlighter) {
            const color = highlighter.color
            this['background'] = `linear-gradient(${color}, ${color})`;
            this['background-size']      = '0% 45%';
            this['background-position']  = '0% 100%';
            this['background-repeat']    = 'no-repeat';
            this['transition-delay']     = '1s';
            this['transition-duration']  = '2.5s';
        }
    };
    
    // 3) Return a Vue component.
    return {
        template: 
            '<span v-bind:style="style">' +
                '&nbsp;<slot></slot>&nbsp;' +
            '</span>',
        props: ['color'],
        data: function() {
            return {
                style: new Style(this),
            };
        },
        mounted: function() {
            window.addEventListener('scroll', this.scroll);
        },
        methods: {
            scroll: function() {
                if (this.startLine() < this.domRectTop()){
                    this.style['background-size'] = '  0% 45%';
                } else {
                    this.style['background-size'] = '100% 45%';
                }
            },
            startLine: function() {
                return window.innerHeight + startLineOffset;
            },
            domRectTop: function() {
                return this.$el.getBoundingClientRect().top;
            },
        },
    };
};
