//
//  HudView.h
//  aMuse
//
//  Created by simone on 14/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HudView : UIView

+ (HudView*)hudInView:(UIView*)view animated:(BOOL)animated disappear:(BOOL)disappear withImage:(UIImage*)image;
@property (nonatomic, strong) NSString *text;
@end
