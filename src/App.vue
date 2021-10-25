<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
	@import "assets/styles/reset.css";

	#app {
		font-family: "SourceHanSansCN-Regular";
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background: #ffffff;
		background-size: 100% 100%;
		-webkit-touch-callout: none; /*系统默认菜单被禁用*/
		-webkit-user-select: none; /*webkit浏览器*/
		-khtml-user-select: none; /*早期浏览器*/
		-moz-user-select: none; /*火狐*/
		-ms-user-select: none; /*IE10*/
		user-select: none;
	}
</style>
