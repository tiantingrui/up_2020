yAxis: [
                        {
                            type: 'value',
                            name: '收益率百分比(%)',
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %'
                            },
                            show: true
                        },
                        {
                            type: 'value',
                            name: '资金使用率(%)',
                            // min: 0,
                            // max: 100,
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ff6700',
                                    width: 3
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            show: true
                        }
                    ],