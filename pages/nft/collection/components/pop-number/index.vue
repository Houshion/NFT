<template>
	<view>
		<u-popup mode="bottom" :show="show" @close="close" :custom-style="{background:'rgba(0,0,0,0)'}">
			<view class="num_box">
				<view class="num_header">
					<view class="title">
						<text>购买数量</text>
					</view>
					<view class='msg' v-if="goods.limitBuyCount>0">
						<text>(最多购买{{goods.limitBuyCount}}个)</text>
					</view>
				</view>
				<view class="body">
					<!-- <view class="msg">
						<text>最多购买{{goods.limitBuyCount}}个</text>
					</view> -->
					<view class="change_num">
						<view class="left">
							<block v-for="(item, index) in 3" :key="index">
								<view :class="['num_item', current == index ? 'active': '']"
									@tap.stop="change(index, (item * 5))">
									<text>{{(item * 5)}}个</text>
								</view>
							</block>
						</view>
						<view class="right">
							<u-number-box 
							v-model="form.buyCount"
							 :max="goods.limitBuyCount>0?goods.limitBuyCount:99999999999999999"
							 inputWidth="90rpx"
							 bgColor="#F5F5F5"
							 @overlimit="overlimit"
							 @change="changeNum">
							 <template slot="minus">
								 <u-icon name="minus" v-if="form.buyCount > 1" style="margin-right: 16rpx;" color="#000000" size="28rpx"></u-icon>
								<u-icon name="minus" v-else style="margin-right: 16rpx;" color="#B3B3B3" size="28rpx"></u-icon>
							 </template>
							 <template slot="plus">
								 <u-icon name="plus" v-if="goods.limitBuyCount !=0 && form.buyCount == goods.limitBuyCount"  style="margin-left: 16rpx;"  color="#B3B3B3" size="28rpx"></u-icon>
								 <u-icon name="plus" v-else style="margin-left: 16rpx;"  color="#000000" size="28rpx"></u-icon>
							 </template>
							</u-number-box>
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="left">
						<text>共计{{form.buyCount}}件</text>
						<text>合计￥{{total | toFixed(2)}}</text>
					</view>
					<u-button hover-class="none" :hairline="false" throttleTime="500" :customStyle="btnStyle"
						@click="handlerBuy">立即购买</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			goods: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				current: -1,
				form: {
					buyCount: 1,
				}
			}
		},
		computed: {
			total() {
				return this.form.buyCount * this.goods.salePrice;
			},
			btnStyle() {
				return {
					width: '380rpx',
					height: '88rpx',
					lineHeight: '88rpx',
					backgroundColor: '#131B32',
					color: '#ffffff',
					fontSize: '30rpx',
					fontWeight: 500,
					fontFamily: 'PingFang SC',
					border: 'none',
					borderRadius: '44rpx',
					margin: '0',
					padding: '0',
				}
			}
		},
		created() {
			this.current = -1;
			this.form.buyCount = 1;
		},
		methods: {
			// 选择数量
			change(index, num) {
				if (this.goods.limitBuyCount !=0 && num > this.goods.limitBuyCount) return uni.showToast({
					title: '超出限购，最多可购买'+this.goods.limitBuyCount + '个',
					icon: 'none',
				})
				if (this.current == index) {
					this.current = -1
					this.form.buyCount = 1;
				} else {
					this.current = index;
					this.form.buyCount = num;
				}
			},
			changeNum(val) {
				this.current = -1
			},
			overlimit(type){
				if (type == 'plus') {
					uni.showToast({
						title: '超出限购，\n最多可购买' + this.goods.limitBuyCount + '个',
						icon: 'none',
					})
				}
			},
			// 立即购买
			handlerBuy() {
				this.$emit('confirm', this.form);
				this.close();
			},
			close() {
				this.$emit('update:show', false);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.num_box {
		width: 100%;
		height: 436rpx;
		padding: 40rpx 32rpx;
		position: relative;
		border-radius: 30rpx 30rpx 0px 0px;
		background: #ffffff;
		overflow: hidden;

		.num_header {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 59rpx;
			.title {
				margin-right: 20rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.msg {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #B3B3B3;
			}
		}

		.body {
			display: flex;
			flex-direction: column;

			.msg {
				margin-bottom: 10rpx;

				text {
					font-size: 22rpx;
				}
			}

			.change_num {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 400rpx;
					grid-template-columns: repeat(3, 1fr);
					grid-template-rows: auto;
					grid-gap: 0 32rpx;

					.num_item {
						width: 110rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: #F5F5F5;
						border-radius: 30rpx;
						text-align: center;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

					.active {
						background-color: #D8ED48;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #010101;
					}
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
				}
			}
		}

		.footer {
			padding: 0 30rpx 0 31rpx;
			position: absolute;
			bottom: 62rpx;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				text{
					&:nth-child(2) {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
