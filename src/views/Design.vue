<template>
    <div style="width: 1200px; height: 600px; overflow: auto;">
        <iframe ref="iframedom" src="http://localhost:8081" frameborder="0" width="100%" height="100%"></iframe>
        <button @click="goBack">返回</button>
    </div>
</template>

<script>
const formData = new FormData()
import { editPrototype, createPreview } from '@/api/api';
export default {
    data() {
        return {

        }
    }, created() {
        // console.log(localStorage.getItem('canvasData'))
        // let iframedom = this.$refs.iframedom
        // let _window = iframedom.contentWindow
        // let _document = iframedom.contentDocument
        // _window.postMessage({ type: 'test', text: 'test' }, "*")
        // window.addEventListener('beforeunload', this.beforeUnload)

    },
    methods: {
        // beforeUnload() {
        //     console.log(formData.get('prototype_id'))
        //     if (formData.get('prototype_id')) {
        //         editPrototype(formData, localStorage.getItem('token')).then(res => {
        //             console.log(res)
        //         })
        //     }
        // }, 
        goBack() {
            this.$router.push('/project/designlist')
        }
    },

    mounted() {
        window.addEventListener('message', (msg) => {
            console.log(msg)
            if (msg.origin === 'http://localhost:8081') {
                console.log(msg.data)
                if (msg.data.type === 'protoData') {
                    formData.append('prototype_name', localStorage.getItem('prototype_name'))
                    formData.append('prototype_description', localStorage.getItem('prototype_description'))
                    // this.prototypeInfo.prototype_id = nanoid()
                    formData.append('prototype_id', localStorage.getItem('prototype_id'))
                    formData.append('project_id', localStorage.getItem('projectID'))
                    formData.append('data_str', msg.data.protoData.canvasData)
                    formData.append('style_str', msg.data.protoData.canvasStyle)
                    editPrototype(formData, localStorage.getItem('token')).then(res => {
                        console.log(res)
                    })

                }
                if (msg.data.type === 'previewData') {
                    console.log(msg.data.previewData)
                    console.log(localStorage.getItem('projectID'))
                    console.log(localStorage.getItem('prototype_id'))
                    const formData = new FormData()
                    formData.append('prototype_id', localStorage.getItem('prototype_id'))
                    formData.append('data_str', msg.data.previewData)
                    createPreview(formData, localStorage.getItem('token')).then(res => {
                        console.log(res)
                    })
                }
            }
        })
        var iframe = document.querySelector('iframe');
        // iframe.isContentEditable.valueOf(true)
        if (iframe) {

            const protoData = { canvasStyle: localStorage.getItem('canvasStyle'), canvasData: localStorage.getItem('canvasData') }
            console.log(protoData)
            iframe.addEventListener('load', () => {
                iframe.contentWindow.postMessage({ type: 'pageData', protoData: protoData }, '*');
            })
            iframe.removeEventListener('load')
        }

    },
    created() {

    },
    beforeDestroy() {

        window.removeEventListener('message')
        window.removeEventListener('beforeunload', this.beforeUnload)
    }
}

</script>

<style lang="scss" scoped>
iframe {
    overflow: auto;
}
</style>