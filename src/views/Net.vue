<template>

<div>
<div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>
</div>


 
</template>

<script>
export default {
    data() {
        return {
            Chart: null,
            date: [],
            data: [],
            cpu_rate : [],

            BytesRXSecond: [],
            BytesTXSecond: [],
        }
    },

    methods:{
        //axios request
        freshData() {
            let now = new Date();
            this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
            + ' ' +[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'))
            this.getDataFromRemote()
        },

        getDataFromRemote(){
            this.axios.get('http://59.110.63.1:8888/sys/info').then(res=>{
                this.BytesRXSecond.push(res.data['net']['BytesRXSecond'])
                this.BytesTXSecond.push(res.data['net']['BytesTXSecond'])
            },error=>{
                console.log(error);
            });
        },

        init(){
            this.Chart=this.$echarts.init(document.getElementById('chartLineBox'));
            this.draw();
            this.now = new Date();
            this.value = Math.random() * 300;
            for(var i = 0; i < 10; i++) {
                this.freshData()
            }
        },

        draw(){
            let option = {
                title: {
                    text: '网络使用情况'
                },
                legend:{
                    data: ['接收速率Byte/s', '发送速率Byte/s']
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        let now = new Date();
                        return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') +
                        ' ' + [now.getHours(), now.getMinutes(), now.getSeconds()].join(':') +
                        ' ' + params.data;
                    },
                    axisPointer: {
                        animation: true
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    data :this.date
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: [{
                    name: '接收速率Byte/s',
                    type: 'line',
                    showSymbol: false,
                    stack: 'a',
                    hoverAnimation: false,
                    data: this.BytesRXSecond
                },
                {
                    name: '发送速率Byte/s',
                    type: 'line',
                    showSymbol: false,
                    stack: 'a',
                    hoverAnimation: false,
                    data: this.BytesTXSecond
                }]
            };

            this.Chart.setOption(option);
        },

    },

    mounted(){
        this.init()
        setInterval(() => {
            for(var i = 0; i < 1; i++) {
                this.BytesRXSecond.shift();
                this.BytesTXSecond.shift()
                this.date.shift();
                this.freshData();
            }
            this.Chart.setOption({
                series:[{
                    data: this.BytesRXSecond
                },
                {
                    data: this.BytesTXSecond
                }],
                xAxis:{
                    data: this.date
                }
            })
        }, 1000);

    },
    created() {

    },

    watch:{
        data : {
            deep : true,
            handler(new_val,old_val){
                if(this.Chart){
                    if(new_val){
                        //this.draw()
                    }
                    else{
                    }
                }
                else{
                    this.init();
                }
            }
        }
    }
}
</script>


<style>

</style>