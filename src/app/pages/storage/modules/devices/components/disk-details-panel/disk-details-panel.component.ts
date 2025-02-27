import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PoolTopologyCategory } from 'app/enums/pool-topology-category.enum';
import { TopologyItemStatus } from 'app/enums/vdev-status.enum';
import { Disk, isTopologyDisk, TopologyItem } from 'app/interfaces/storage.interface';

@Component({
  selector: 'ix-disk-details-panel',
  templateUrl: './disk-details-panel.component.html',
  styleUrls: ['./disk-details-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiskDetailsPanelComponent {
  @Input() topologyItem: TopologyItem;
  @Input() topologyParentItem: TopologyItem;
  @Input() disk: Disk;
  @Input() poolId: number;
  @Input() topologyCategory: PoolTopologyCategory;

  @Output() closeMobileDetails: EventEmitter<void> = new EventEmitter<void>();

  get title(): string {
    if (isTopologyDisk(this.topologyItem)) {
      return this.topologyItem.disk || this.topologyItem.guid;
    }

    return this.topologyItem.type;
  }

  get isTopologyDisk(): boolean {
    return isTopologyDisk(this.topologyItem)
      && this.topologyItem.status !== TopologyItemStatus.Unavail;
  }

  onCloseMobileDetails(): void {
    this.closeMobileDetails.emit();
  }

  get hasTopologyItemDisk(): boolean {
    if (isTopologyDisk(this.topologyItem)) {
      return this.topologyItem.disk !== null;
    }
  }
}
