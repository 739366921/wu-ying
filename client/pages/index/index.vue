<template>
	<view class="content">
		<swiper style="height:350rpx" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperlist" :key="index">
				<image :class="'swiper-item'+(index+1)" :src="item.url"></image>
			</swiper-item>
		</swiper>
		<view class="help" @click="toHelp()">
			<u-icon class="helpIcon" color="#fff" name="question"></u-icon>
			<text>使用教程</text>
		</view>
		<view class="text-area">
			<u-input v-model="url" @input='inputing()' placeholder="请将视频链接粘贴进去" :clearable="false"></u-input>
			<text class="text-desc">温馨提示：如果遇到无法解析视频时请复制如 "http://www.xxx.com" 的链接</text>
			<view class="button-area">
				<view class="first">
					<u-button class="copy" size="mini" type="primary" :ripple="true" @click="copy()">粘贴</u-button>
					<u-button class="clear" type="error" size="mini" :ripple="true" @click="clear()">清空</u-button>
				</view>
				<u-button :disabled="analyseflag" class="analyseVideo" type="success" size="medium" :ripple="true" @click="analyseVideo()">
					<u-icon name="hourglass-half-fill"></u-icon>解析视频
				</u-button>
				<view class="text-desc downloadtext">如果视频下载速度过慢时，可以将无水印视频链接复制到浏览器下载</view>
				<view class="bottom" v-if="isShow">
					<view class="bottom-button">
						<view class="downloadVideo-area">
							<u-button :disabled="disabledVideo" class="downloadVideo" :ripple="true" type="error" size="medium" @click="downloadVideo()">
								<u-icon name="play-circle-fill"></u-icon>下载视频
							</u-button>
							<!-- <view class="progress" >
								<u-line-progress active-color="#2979ff" :percent="70" :striped="true" :striped-active="true" :show-percent="true"></u-line-progress>
							</view> -->
						</view>

						<view class="downloadImg-area">
							<u-button :disabled="disabledImg" class="downloadImg" type="primary" size="medium" :ripple="true" @click="downloadImg()">
								<u-icon name="photo-fill"></u-icon>下载封面
							</u-button>
							<!-- <view class="progress">
								<u-line-progress active-color="#2979ff" :percent="70" :striped="true" :striped-active="true" :show-percent="true"></u-line-progress>
							</view> -->
						</view>

					</view>
					<view class="bottom-button">
						<u-button class="downloadVideo" style="padding-right: 20rpx;" :ripple="true" type="error" size="medium" @click="copyVideo()">
							<u-icon name="play-circle-fill"></u-icon>复制视频链接
						</u-button>
						<u-button class="downloadImg" type="primary" size="medium" :ripple="true" @click="copyImg()">
							<u-icon name="photo-fill"></u-icon>复制封面链接
						</u-button>
					</view>
					<video :src="analyseurl"></video>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabledVideo: false, //可用，预防多次点击
				disabledImg: false, //可用，预防多次点击
				analyseflag: false, //预防浪费接口
				isShow: false, //展示下面预览的内容
				url: '',
				analyseurl: '', //解析后的视频url
				analyseImgUrl: '', //解析后的图片url
				downloadurl: '',
				swiperlist: [{
					url: "../../static/swiper0.png",
				}, {
					url: "../../static/swiper1.jpg"
				}]
			}
		},
		onLoad() {},
		methods: {
			analyseVideo() {
				uni.showLoading({
					title: '解析中...',
					mask:true
				});
				this.disabledVideo=false, 
				this.disabledImg=false,
				this.$request(this.$api.wuyin.analyse, {
					// 传参参数名：参数值,如果没有，就不需要传
					"path": this.url
				}).then(res => {
					// 打印调用成功回调
					this.analyseurl = res.data.url
					this.analyseImgUrl = res.data.img
					if (res.msg == "解析失败") {
						this.isShow = false
						uni.hideLoading();
						uni.showToast({
							title: '解析失败',
							icon: 'none',
							duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
						})
					} else if (res.msg == "解析成功") {
						uni.hideLoading();
						uni.showToast({
							title: '解析成功',
							icon: 'none',
							duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
						})
						this.isShow = true
						this.analyseflag = true

					}
					console.log('11', res)
					console.log('22', this.analyseurl)
				})
			},
			// 已实现
			downloadVideo() {
				console.log("触发下载video按钮")
				let that = this
				this.disabledVideo = true //下载期间禁用
				uni.showLoading({
					title: '视频下载中...',
					mask:true
				});
				this.$requestbuffer(this.$api.wuyin.download, {
					"path": this.analyseurl
				}).then(res => {
					// console.log("触发视频接口", res)
					let videoSrc = uni.arrayBufferToBase64(res); //二进制流转为base64编码
					// console.log("触发视频接口转码后", videoSrc)
					const save = uni.getFileSystemManager();
					let number = Math.random();
					save.writeFile({
						filePath: wx.env.USER_DATA_PATH + '/' + number + 'video.mp4',
						data: videoSrc,
						encoding: 'base64',
						success: res => {
							uni.saveVideoToPhotosAlbum({ //保存为mp4格式到相册
								filePath: wx.env.USER_DATA_PATH + '/' + number + 'video.mp4',
								success: function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '下载成功',
										icon: 'none',
										// duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
									})
									that.disabledVideo = false //下载期间禁用
								},
								fail: function(err) {
									console.log(err)
									//关闭加载提示
									uni.hideLoading();
									if ("saveVideoToPhotosAlbum:fail auth deny" == res.errMsg ||
										"saveVideoToPhotosAlbum:fail:auth deny" == res.errMsg ||
										"saveVideoToPhotosAlbum:fail:auth denied" == res.errMsg ||
										"saveVideoToPhotosAlbum:fail authorize no response" == res.errMsg ||
										"saveVideoToPhotosAlbum:fail socket hang up" == res.errMsg) {

										uni.showToast({
											title: '您未授权保存到相册，请删除小程序重新进入授权',
											icon: 'none'
										})
									}else{
										uni.showToast({
											title: '可能视频不支持，请换视频重试',
											icon: 'none'
										})
									}
									that.disabledVideo = false //下载期间禁用
								}
							})
						},
						fail: err => {
							uni.hideLoading();
							uni.showToast({
								title: '视频过大，不支持',
								icon: 'none'
							})
							that.disabledVideo = false //下载期间禁用
							console.log(err)
						}
					})
				});
			},
			//已实现
			downloadImg() {
				let that = this
				console.log("触发下载img按钮", this.analyseImgUrl)
				this.disabledImg = true //下载期间禁用
				uni.showLoading({
					title: '封面下载中...',
					mask:true
				});
				this.$requestbuffer(this.$api.wuyin.downloadImg, {
					"imgPath": this.analyseImgUrl,
				}).then(res => {
					// console.log("触发封面接口", res)
					let imgSrc = uni.arrayBufferToBase64(res); //二进制流转为base64编码
					// console.log("触发封面接口转码后", imgSrc)
					const save = uni.getFileSystemManager();
					let number = Math.random();
					save.writeFile({
						filePath: wx.env.USER_DATA_PATH + '/' + number + 'image.jpg',
						data: imgSrc,
						encoding: 'base64',
						success: res => {
							uni.saveImageToPhotosAlbum({ //保存为png格式到相册
								filePath: wx.env.USER_DATA_PATH + '/' + number + 'image.jpg',
								success: function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '下载成功',
										icon: 'none',
										duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
									})
									that.disabledImg = false //下载期间禁用
								},
								fail: function(res) {
									that.disabledImg = false //下载期间禁用
									//关闭加载提示
									uni.hideLoading();
									if ("saveImageToPhotosAlbum:fail auth deny" == res.errMsg ||
										"saveImageToPhotosAlbum:fail:auth deny" == res.errMsg ||
										"saveImageToPhotosAlbum:fail:auth denied" == res.errMsg ||
										"saveImageToPhotosAlbum:fail authorize no response" == res.errMsg ||
										"saveImageToPhotosAlbum:fail socket hang up" == res.errMsg) {

										uni.showToast({
											title: '您未授权保存到相册，请删除小程序重新进入授权',
											icon: 'none'
										})
									}
									console.log(res)
								}
							})
						},
						fail: err => {
							uni.hideLoading();
							that.disabledImg = false //下载期间禁用
							console.log(err)
						}
					})
				})
			},
			toHelp() {
				uni.navigateTo({
					url: '/pages/help/help'
				})
			},
			copyVideo() {
				let that = this
				uni.setClipboardData({
					data: that.analyseurl,
					// success: function () {
					//     console.log('success');
					// }
				});
			},
			copyImg() {
				let that = this
				uni.setClipboardData({
					data: that.analyseImgUrl,
					// success: function () {
					//     console.log('success');
					// }
				});
			},
			inputing() {
				// console.log(this.url)
			},
			//获取剪贴板内容
			copy() {
				let that = this
				this.analyseflag = false
				uni.getClipboardData({
					success: function(res) {
						if (res.data) {
							that.url = res.data
						}
						console.log("111", res);
					}
				});
			},
			//清空input
			clear() {
				this.url = ''
				this.analyseflag = false
			}
		}
	}
</script>

<style lang="scss">
	.text-desc {
		font-size: 20rpx;
		color: #DCDFE6;
		margin-bottom: 40rpx;

	}

	.downloadtext {
		color: #F29100;
		text-align: center;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		swiper {
			width: 100%;

			swiper-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.swiper-item1 {
					width: 100%;
					height: 150%;
				}

				.swiper-item2 {

					width: 100%;
					height: 70%;
				}
			}

		}

		.help {
			width: 100%;
			padding: 30rpx 30rpx 0 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.helpIcon {
				height: 40rpx;
				width: 40rpx;
				background-color: #F29100;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				border-radius: 50%;
				margin-right: 15rpx;
			}

			text {
				font-size: 26rpx;
				color: #606266;
			}
		}

		.text-area {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			padding: 30rpx;
			width: 100%;

			u-input {
				padding: 0 10rpx;
				margin-bottom: 30rpx;
				border-radius: 10rpx;
				width: 100%;
				box-shadow: 0 0 10rpx 10rpx #eeeeee;
			}


			.button-area {
				width: 100%;

				.first {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					width: 100%;
					margin-bottom: 30rpx;

					.copy {
						margin: 0 !important;
					}

					.clear {
						margin: 0 !important;
					}
				}

				.analyseVideo {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-bottom: 20rpx;
				}

				.bottom {
					display: flex;
					flex-direction: column;
					align-items: center;

					.bottom-button {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						align-items: center;
						margin-bottom: 20rpx;

						.downloadVideo-area {
							position: relative;

							.downloadVideo {
								padding-right: 20rpx;

								.progress {
									position: absolute;
									margin-right: 20rpx;
									left: 0;
									top: 0;
								}
							}
						}

						.downloadImg-area {
							position: relative;

							.downloadImg {

								.progress {
									position: absolute;
									margin-right: 20rpx;
									left: 0;
									top: 0;
								}
							}
						}

					}

				}
			}
		}

	}
</style>
