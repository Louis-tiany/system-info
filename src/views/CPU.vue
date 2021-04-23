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

            total_mem: null,
            mem_used_rate: [],

            total_disk: null,
            disk_used_rate: [],

            value : 100,
        }
    },

    methods:{
        //axios request
        freshData() {
            let now = new Date();
            this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
            + ' ' +[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'))
            this.value = this.value + Math.random() * 21 - 10
            this.getDataFromRemote()
        },

        getDataFromRemote(){
            this.axios.get('http://59.110.63.1:8888/sys/info').then(res=>{
                this.cpu_rate.push(res.data['cpu']['used_rate'])
                this.mem_used_rate.push(res.data['memory']['used_rate'])
                this.total_mem = res.data['memory']['total_memory']
                this.disk_used_rate.push(res.data['disk']['used_rate'])
                this.total_disk = res.data['disk']['total_disk']
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
                    text: 'CPU使用率'
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
                        animation: false
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    data :this.date
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max:100,
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: [{
                    name: 'CPU数据',
                    type: 'line',
                    showSymbol: false,
                    stack: 'a',
                    hoverAnimation: false,
                    areaStyle : {
                        normal: {}
                    },
                    data: this.cpu_rate
                }]
            };

            this.Chart.setOption(option);
        },

    },

    mounted(){
        this.init()
        setInterval(() => {
            for(var i = 0; i < 1; i++) {
                this.cpu_rate.shift();
                this.date.shift();
                this.freshData();
            }
            this.Chart.setOption({
                series:[{
                    data: this.cpu_rate
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