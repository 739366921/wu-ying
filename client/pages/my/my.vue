<template>
	<view class="container">
		<view class="top">
			<view class="left">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="right">
				<view class="head">
					无印出品
				</view>
				<view class="desc">
					视频·去水印工具
				</view>
			</view>
		</view>
		<view class="version">
			当前版本v1.0
		</view>
		<u-button class="ubutton" size="medium" type="success" shape="circle" open-type='share'>分享给好友</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShareAppMessage() {
			return {
				title: '无印出品',
				desc: '视频去水印小工具',
				path: '/pages/index/index' // 路径，传递参数到指定页面。    
			}
		}
	}
</script>

<style lang="scss">
	%flex-col-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%flex-row-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	page {
		background-color: #f5f5f5;
	}

	.container {
		display: flex;
		flex-direction: column;
		padding: 80rpx 100rpx 30rpx 100rpx;

		.top {
			@extend %flex-row-center;

			.left {
				margin-right: 30rpx;

				image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 20rpx;
				}
			}

			.right {
				@extend %flex-col-center;

				.head {
					font-size: 46rpx;
					color: #808080;
				}

				.desc {
					color: #999;
					font-size: 24rpx;
				}
			}
		}

		.version {
			color: #999;
			@extend %flex-row-center;
			font-size: 26rpx;
			margin-bottom: 20rpx;
		}

		.ubutton {
			@extend %flex-row-center;
		}
	}
</style>
