<template>
	<div class="code-editor-container">
		<div class="menu-bar">
			<div class="file-path">
				solutions/world-{{world}}/{{world}}-{{level}}/index.js
			</div>

			<button class="btn btn-primary" :disabled="saving" @click="save">
				<fa-icon>save</fa-icon>
				Salvar
			</button>
		</div>

		<div class="code-editor" ref="editor" :style="{ height: height + 'px' }"></div>
	</div>
</template>

<script>
	import api from '../services/api.js';
	import * as monaco from 'monaco-editor';
	import FaIcon from './FaIcon.vue';

	export default {
		name: 'CodeEditor',
		components: { FaIcon },
		data: () => ({
			contents: null,
			saving: false,
			height: 300
		}),
		props: {
			world: {
				type: Number,
				required: true
			},
			level: {
				type: Number,
				required: true
			}
		},

		async mounted() {
			this.contents = await api.solution.read(this.world, this.level);

			this.editor = monaco.editor.create(this.$refs.editor, {
				value: this.contents,
				language: 'javascript',
				theme: "vs-dark",
				scrollBeyondLastLine: false,
				scrollbar: {
					alwaysConsumeMouseWheel: false
				}
			});

			this.editor.addAction({
				id: 'save-code',
				label: 'Save',
				keybindings: [
					monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S
				],
				run: () => {
					this.save();
				}
			});

			this.editor.onDidChangeModelContent(() => {
				this.contents = this.editor.getValue();
			});

			let ignoreSizeChange = false;
			this.editor.onDidContentSizeChange(() => {
				const contentHeight = Math.max(100, this.editor.getContentHeight());
				this.height = contentHeight;

				try {
					ignoreSizeChange = true;

					this.editor.layout({ width: this.$refs.editor.getBoundingClientRect().width, height: contentHeight });
				} finally {
					ignoreSizeChange = false;
				}
			});
		},

		beforeUnmount() {
			this.editor.dispose();
		},

		methods: {
			async save() {
				if (this.saving) return;

				this.saving = true;

				await api.solution.write(this.world, this.level, this.contents);

				this.saving = false;

				this.$emit('save');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.code-editor-container {
		background-color: #1e1e1e;
	}

	.menu-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.file-path {
			padding-left: $spacer * 2;
			font-size: $font-size-xs;
			color: gray;
		}
	}

	.code-editor {}
</style>
