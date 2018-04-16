import { observable, computed, action } from 'mobx';

export interface NavigationState {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

class BasicNavigationState {
  @observable public drawerOpen: boolean = false;
  @action
  public openDrawer(): void {
    this.drawerOpen = true;
  }
  @action
  public closeDrawer(): void {
    this.drawerOpen = false;
  }
}

export const state: NavigationState = new BasicNavigationState();
