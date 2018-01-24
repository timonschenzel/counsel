module.exports = class HelloWorldVueComponentTest extends VueComponentTestCase
{
    /** @test */
    it_is_able_to_render_a_dot_vue_component_file()
    {
		Vue.component('hello-world-dot-vue-component', require('../../VueComponents/HelloWorld.vue'));

        let componentWithDefaultGreeting = this.render('<hello-world-dot-vue-component></hello-world-dot-vue-component>');
        componentWithDefaultGreeting.assertSee('Hello World!');

        dump(componentWithDefaultGreeting.toHtml());

        let componentWithInlineGreeting = this.render('<hello-world-dot-vue-component greeting="Hello Vue Component"></hello-world-dot-vue-component>');
        componentWithInlineGreeting.assertSee('Hello Vue Component!');

        let greeting = 'Hello World';
        let componentWithBindGreeting = this.render('<hello-world-dot-vue-component :greeting="greeting"></hello-world-dot-vue-component>', {
            greeting
        });
        componentWithBindGreeting.assertSee('Hello World!');
    }
}
