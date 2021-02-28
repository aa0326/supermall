<template>
  <div class="feature">
    <div class="feature-item">
      <a href="">
        <img src="~assets/img/home/recommend_bg.jpg" alt="">
      </a>
    </div>
  </div>
</template>

<script>
	export default {
		name: "FeatureView",
	}
</script>

<style>
  .feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .feature-item {
    flex: 1;
    text-align: center;
  }

  .feature img {
    /* width: 80px;
    height: 80px; */
    width:100%;
    margin-bottom: 10px;
  }
</style>
