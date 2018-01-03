const app = new Vue({
	el: '#app',
	data() {
		return ({
			ninjas: [],
			name: ''
		})
	},
	methods: {
		findNinjas() {
			fetch('http://localhost:4000/api/ninjas/?name=' + this.name)
				.then(data => data.json())
				.then(parse => this.ninjas = parse)
				.catch(() => this.ninjas = []);
		}
	}
});
