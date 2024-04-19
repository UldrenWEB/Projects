<template>
    <div :class="{ expanded: expanded }" class="relative w-full">
        <div class="label w-full flex flex-row justify-start whitespace-nowrap select-none max-h-12 box-border px-5 transition-all duration-300 ease-in-out hover:bg-blue-200"
            @click="toggleMenu" :style="{ paddingLeft: depth * 20 + 20 + 'px' }">
            <div class="left flex mx-1 items-center gap-2">
                <svg-icon v-if="icon" type="mdi" :path="getPathIcon(icon)"
                    class="expand text-lg transition-all duration-300 ease-in-out" :class="{ 'pr-5': hideLabels }">
                </svg-icon>
                <span v-if="!hideLabels" class="text-opacity-90">{{ label }}</span>
            </div>
            <div v-if="data" class="right">
                <svg-icon v-if="!hideLabels" type="mdi" :path="getPathIcon('expand_more')"
                    :class="{ expanded: expanded }" class="expand text-lg transition-all duration-300 ease-in-out">
                </svg-icon>
            </div>
        </div>
    </div>
    <div v-show="showChildren" ref="container" class="item-container w-full overflow-hidden duration-300 ease-in-out"
        :style="{ height: containerHeight }">
        <NavItem v-for="( item, index ) in  data " :key="index" :label="item.label" :icon="item.icon" :depth="depth + 1"
            :data="item.children" />
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';

import {
    mdiHomeVariant,
    mdiCog,
    mdiChevronDown,
    mdiAccount,
    mdiWeatherSunny,
    mdiWeatherNight
} from '@mdi/js';

const iconEnum = {
    home: mdiHomeVariant,
    settings: mdiCog,
    expand_more: mdiChevronDown,
    user: mdiAccount,
    sol: mdiWeatherSunny,
    luna: mdiWeatherNight
}
export default {
    name: 'NavItem',
    data: () => ({
        showChildren: false,
        expanded: false,
        containerHeight: 0
    }),
    props: {
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String,
        },
        depth: {
            type: Number,
            required: true
        },
        hideLabels: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array
        }

    },
    components: {
        SvgIcon
    },
    methods: {
        toggleMenu() {
            this.expanded = !this.expanded;

            if (!this.showChildren) {
                this.showChildren = true;
                this.$nextTick(() => {
                    this.containerHeight = this.$refs.container.scrollHeight + 'px';
                    setTimeout(() => {
                        this.containerHeight = 'fit-content';
                        this.$refs.container.style.overflow = 'visible';
                    }, 300); //Lo que dura la animacion
                });
            } else {
                this.containerHeight = this.$refs.container.scrollHeight + 'px';
                this.$refs.container.style.overflow = 'hidden';
                setTimeout(() => {
                    this.containerHeight = 0 + 'px';
                }, 20)
                setTimeout(() => {
                    this.showChildren = false;
                }, 300)
                this.showChildren = false;
            }
        },
        setActive(index) {
            console.log('se dio click', index)
            this.menutree.forEach((item, i) => {
                if (i === index) {
                    console.log('este es')
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        },
        getPathIcon(icon) {
            return iconEnum[icon];
        }
    }
}
</script>

<style scoped lang="scss">
svg-icon {
    &.expand {
        font-size: 15px;
        color: #cacaca;

        &.expanded {
            transform: rotate(180deg);
        }
    }

    &:hover {
        cursor: pointer;
    }
}
</style>