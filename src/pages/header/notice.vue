<template>
    <TableInfo :columns="columns" :dataSource="dataSource">
        <p slot="content" slot-scope="props">
            <el-button type="text" @click="showContent(props.data.id)">点击查看内容</el-button>
            <el-dialog title="详细内容" :visible="getContentStatus(props.data.id)" width="50%" top='50px' @close="closeContentStatus">
                <div class="detail-content__size">
                    <Editor :id="props.data.id" :content="props.data.content" :readonly="true" />
                </div>
            </el-dialog>
        </p>
        <p slot="attachment" slot-scope="props">
            <el-button type="text" @click="downloadAttachment(props.data.id,props.data.attachmentName)">{{props.data.attachmentName}}</el-button>
        </p>
    </TableInfo>
</template>
<script>
import {
  changeNoticeStatus,
  queryMoreNotice
} from '../../api/user';
import Editor from 'Components/editor/index';
import TableInfo from 'Components/table/index';
import mixin from '../func/mixins/tableMixins';
  import http from 'Utils/request';
export default {
    mixins: [mixin],
    data() {
        return {
            contentId: '',
            columns: [],
            dataSource: [],
            contentVisible: false
        };
    },
    components: {
        TableInfo,
        Editor
    },
    methods: {
        downloadAttachment(id,attachment) {
            if (attachment === undefined || attachment === null || attachment.length === 0) {
                alert('暂未上传附件')
            }
            http.get('a/government/noticeAttachmentDownload?id=' + id)
        },
        closeContentStatus() {
            this.contentVisible = false;
            this.contentId = '';
        },
        showContent(id) {
            this.contentId = id;
            this.contentVisible = true;
            changeNoticeStatus(id).then(res => {
            queryMoreNotice().then(res => {
                this.columns = this.adapterColumns(res.headList);
                this.dataSource = res.contentList;
            });
          });
        },
        getContentStatus(id) {
          return this.contentVisible && this.contentId === id;
        },
        initTable() {
            queryMoreNotice().then(res => {
                this.columns = this.adapterColumns(res.headList);
                this.dataSource = res.contentList;
            });
        }
    },
    mounted() {
        this.initTable()
    }

};
</script>