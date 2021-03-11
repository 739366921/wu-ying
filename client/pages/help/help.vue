<template>
	<view class="container">
		<view class="head">
			使用教程
		</view>
		<view class="num">步骤一：</view>
		<image class="image1" src="/static/help/help1.jpeg"></image>
		<view class="num">步骤二：</view>
		<image class="image2" src="/static/help/help2.jpeg"></image>
		<view class="num">步骤三：</view>
		<image class="image3" src="/static/help/help3.jpeg"></image>
		<view class="num">步骤四：</view>
		<image class="image4" src="/static/help/help4.jpeg"></image>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
		background-color: #1c0d43;
		.head{
			font-size: 40rpx;
			color: #83d5b7;
			margin-bottom: 20rpx;
		}
		
		.num{
			flex-direction: row;
			justify-content: flex-start;
			color: #83d5b7;
			margin-bottom: 30rpx;
		}
		
		image{
			margin-bottom:30rpx ;
			border-radius: 20rpx;
		}

		.image1{}

		.image2{
			height: 220rpx;
		}

		.image3{
			height: 1000rpx;
		}

		.image4{
			height: 800rpx;
		}
	}
</style>
