<template>
	<v-app>
		<AppHeader />
		<v-container>
			<v-row justify="center">
				<v-col cols="4">
					<v-select
						:items="folderNames"
						v-on:change="updateValue"
						label="Folder Name"
					/>
				</v-col>
			</v-row>
			<SVGs :svgs="svgs" :folder="folder" />
			<v-row justify="center">
				<v-btn @click="test(folder)">Create Font</v-btn>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppHeader from './components/AppHeader'
import SVGs from './components/SVGs'

const { spawn, exec } = require('child_process');
var fg = require('./index.js'), path = require('path');
const fs = require('fs')
	
export default {
  name: 'App',
  components: {
	  AppHeader,
	  SVGs
  },
  data: () => ({
	  files:null,
	  folderNames:['SVGs','FontAwesome']
  }),
  computed: {
	...mapActions(['updateSvgs','updateFolder']),
	...mapState(['svgs', 'folder'])
  },
  methods: {
	  updateValue: function(value) {
	  this.$store.dispatch("updateFolder", value);
	  this.loadLocal(value)
	},
	loadLocal(folder) {
		fs.readdir(`./src/${folder}/`, (err, json) => {
			let arr = [];
			if (err) throw err
			console.log('files',json);
			for (let i = 0; i < json.length; i++) {
				json[i].indexOf('svg') != -1 ? arr.push(json[i]) : null;
			}
			this.$store.dispatch("updateSvgs", arr);
		});
		/* $.ajax({
			url : `${window.location.protocol}//${window.location.hostname}/public/php/scandir.php`,
			type: 'POST',
			data: { folder },
			success: (data) => {
				let json = JSON.parse(data);
				let arr = [];
				for (let i = 0; i < json.length; i++) {
					json[i].indexOf('svg') != -1 ? arr.push(json[i]) : null;
				}
					this.$store.dispatch("updateSvgs", arr);
			}
		}); */
	},

	test: function(folder) {
		console.log('HIII',);
		let inputDir = 'src/' + folder;
		let outputDir = 'src/Font'
		fg.generateFont(inputDir, outputDir, function (err, result) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		console.log('Successfully generated font from ' + inputDir);
		console.log(result);
		});
	}
  },
};
</script>

<style lang="scss">
	html {
		overflow: hidden !important;
	}

</style>