<template>
    <div>
        <slot-nav>
            <template v-slot:header="{user}">
                {{ user.email }}
            </template>
        </slot-nav>
        <slot-layout>
            <template v-slot:default>
                {content}
            </template>
        </slot-layout>
    </div>
</template>

<script>
import SlotLayout from './SlotLayout'
import SlotNav from './SlotNav'

export default {
    components: {
        SlotLayout,
        SlotNav
    },
    data() {
        return {
            content: 'Hello Slot'
        }
    },
}
</script>