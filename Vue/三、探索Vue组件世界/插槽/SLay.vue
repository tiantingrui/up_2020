<template>
    <s-load url='http://xxx.com/api' #default='{data}'>
        <div> 锣鼓喧天，旌旗蔽空欢迎 {{data.name}}</div>
    </s-load>
</template>

<script>
import SLoad from './Sload'

export default {
    components: {
        SLoad
    }
}
</script>