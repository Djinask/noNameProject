//
//  HudView.m
//  aMuse
//
//  Created by simone on 14/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "HudView.h"

@implementation HudView{
    UIImage *semage;
}

+ (HudView *)hudInView:(UIView *)view animated:(BOOL)animated disappear:(BOOL)disappear withImage:(UIImage*)image{
    HudView *checkView = [[HudView alloc]initWithFrame:view.bounds];
    checkView.opaque = NO;
    UIImage *newImage = image;
    
    [view addSubview:checkView];
    view.userInteractionEnabled = NO;
    [checkView showAnimated:animated doDisappear:disappear setImage:newImage];
    return checkView;
}

-(void)showAnimated:(BOOL)animated doDisappear:(BOOL)disappear setImage:(UIImage*)image{
    if(animated){
        semage = image;
        self.alpha = 0.0;
        self.transform = CGAffineTransformMakeScale(1.3, 1.3);
        [UIView beginAnimations:nil context:NULL];
        [UIView setAnimationDuration:0.3];
        self.alpha = 1.0;
        self.transform = CGAffineTransformIdentity;
        [UIView commitAnimations];
        if(disappear){
            [self performSelector:@selector(disappear) withObject:nil afterDelay:0.6];
        }
    }
}

- (void)disappear{
    self.alpha = 1.0;
    [UIView beginAnimations:nil context:NULL];
    [UIView setAnimationDuration:0.3];
    self.transform = CGAffineTransformMakeScale(0.86, 0.86);
    self.alpha = 0.0;
    [UIView commitAnimations];
}

- (void)drawRect:(CGRect)rect{
    const CGFloat boxWidth = 136.0;
    const CGFloat boxHeight = 136.0;

    CGRect boxRect = CGRectMake(roundf(self.bounds.size.width - boxWidth)/2,
                                roundf(self.bounds.size.height - boxHeight)/2 - 40,
                                boxWidth,
                                boxHeight);
    UIBezierPath *roundedRect = [UIBezierPath bezierPathWithRoundedRect:boxRect cornerRadius:10.0];
    [[UIColor colorWithWhite:0.0 alpha:0.75] setFill];
    [roundedRect fill];
    
    UIImage *image = semage;
    CGPoint imagepoint = CGPointMake(self.center.x -roundf(image.size.width/2.0f), self.center.y - roundf(image.size.height / 2.0) -boxHeight / 8.0 - 40);
    
    [image drawAtPoint:imagepoint];
    
    [[UIColor whiteColor] set];

    UIFont *font = [UIFont boldSystemFontOfSize:16.0];
    CGSize textSize = [self.text sizeWithFont:font];
    CGPoint textPoint = CGPointMake(self.center.x - roundf(textSize.width / 2.0), self.center.y - roundf(textSize.height / 2) + boxHeight / 4.0  -40);
    
    [self.text drawAtPoint:textPoint withFont:font];
    
}

@end
